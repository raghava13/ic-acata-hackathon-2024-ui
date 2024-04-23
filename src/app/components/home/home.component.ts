import { AsyncPipe, KeyValue } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { NlpRequest } from '../../core/models/nlp-request';
import { PromptRequest } from '../../core/models/prompt-request';
import { NlpService } from '../../core/services/nlp.service';
import {
  getNlpAccuracy,
  getNlpElement,
  getNlpResult,
  resetNlpResult,
} from '../../state/global.actions';
import { DocumentComponent } from '../document/document.component';
import { NlpAccuracyComponent } from '../nlp-accuracy/nlp-accuracy.component';
import { NlpElementComponent } from '../nlp-element/nlp-element.component';
import { NlpResultComponent } from '../nlp-result/nlp-result.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    NlpResultComponent,
    NlpAccuracyComponent,
    MatChipsModule,
    MatIconModule,
    NlpElementComponent,
    MatSelectModule,
  ],
})
export class HomeComponent {
  subject?: WebSocketSubject<any>;

  formGroup: FormGroup<{
    name: FormControl<string>;
    documentList: FormControl<number[]>;
    temperature: FormControl<number>;
    topP: FormControl<number>;
    maxTokens: FormControl<number>;
    template: FormControl<string>;
    knowledge: FormControl<string>;
    userContent: FormControl<string>;
  }>;

  processId: number = 0;

  templates: KeyValue<string, string>[];

  logs: string[] = [];

  partiallyCompleted = 1;
  completed = false;
  processing = false;

  @ViewChild('log') private logContainer!: ElementRef;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private nlpService: NlpService
  ) {
    this.formGroup = this.createFormGroup();
    this.templates = [
      { key: 'default', value: 'Default' },
      { key: 'genetics', value: 'Genetics' },
      { key: 'md_followup_note', value: 'MD Followup Note' },
      { key: 'pathology', value: 'Pathology' },
      { key: 'radiation', value: 'Radiation' },
    ];
  }

  createFormGroup(formValue?: PromptRequest) {
    return new FormGroup({
      name: new FormControl<string>('Test 1', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      documentList: new FormControl<number[]>([109546], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      temperature: new FormControl<number>(formValue?.temperature || 0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      topP: new FormControl<number>(formValue?.topP || 0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      maxTokens: new FormControl<number>(formValue?.maxTokens || 0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      template: new FormControl<string>(formValue?.template || '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      knowledge: new FormControl<string>(formValue?.knowledge || '', {
        nonNullable: true,
      }),
      userContent: new FormControl<string>(formValue?.userContent || '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  scrollToBottom(): void {
    try {
      this.logContainer.nativeElement.scrollTop =
        this.logContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  handleSelectionChange(template: string) {
    this.nlpService.loadTemplate(template).subscribe((formValues) => {
      this.formGroup = this.createFormGroup(formValues);
    });
  }

  removeDocumentId(documentId: number) {
    const index = this.formGroup.value.documentList?.indexOf(documentId) || 0;
    if (index >= 0) {
      this.formGroup.value.documentList?.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const documentId = parseInt(value);
    if (!isNaN(documentId)) {
      const index = this.formGroup.value.documentList?.findIndex(
        (docId) => docId == documentId
      );
      if (index == -1) {
        this.formGroup.value.documentList?.push(documentId);
      }
    }
    event.chipInput!.clear();
  }

  async handleSearch() {
    const documentListNew = await firstValueFrom(
      this.dialog
        .open(DocumentComponent, {
          disableClose: true,
          panelClass: 'document-dialog',
          height: '50rem',
          width: '80rem',
        })
        .afterClosed()
    );
    const documentListOld = this.formGroup.value.documentList || [];
    const documentList: number[] = [
      ...new Set([...documentListNew, ...documentListOld]),
    ];
    this.formGroup.patchValue({ documentList });
  }

  handleReset() {
    this.formGroup.reset();
  }

  handleClear() {
    this.formGroup.patchValue({
      name: '',
      documentList: [],
      temperature: 0,
      topP: 0,
      maxTokens: 0,
      template: '',
      knowledge: '',
      userContent: '',
    });
  }

  handleProcess() {
    this.processing = true;
    this.store.dispatch(resetNlpResult());
    this.logs = [];
    this.partiallyCompleted = 0;
    this.completed = false;
    const request = this.formGroup.value as NlpRequest;

    this.subject = webSocket('ws://127.0.0.1:8000/nlp/process/ws');

    this.subject.subscribe({
      next: (msg: any) => {
        console.log('message received: ' + msg.message);
        this.logs.push(msg.message);
        if (msg.message.indexOf('Process ID Generated') > -1) {
          this.processId = +msg.message.split(' - ')[1];
        }
        if (msg.message.indexOf('Process started for the Document ID') > -1) {
          this.partiallyCompleted += 1;
        }
        if (msg.message.indexOf('Process completed for the Document ID') > -1) {
          const nlpId = this.processId;
          this.store.dispatch(getNlpResult({ nlpId }));
          this.store.dispatch(getNlpElement({ nlpId }));
        }
        if (msg.message === 'COMPLETED') {
          this.completed = true;
          this.processing = false;
          this.subject?.complete();
          const nlpId = this.processId;
          this.store.dispatch(getNlpAccuracy({ nlpId }));
        }
        setTimeout(() => {
          this.scrollToBottom();
        });
      },
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });

    this.subject.next(request);
  }

  handleRefresh() {
    const nlpId = this.processId;
    if (nlpId) {
      this.store.dispatch(getNlpResult({ nlpId }));
      this.store.dispatch(getNlpElement({ nlpId }));
      this.store.dispatch(getNlpAccuracy({ nlpId }));
    }
  }
}
