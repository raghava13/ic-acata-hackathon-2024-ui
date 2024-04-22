import { AsyncPipe, KeyValue } from '@angular/common';
import { Component } from '@angular/core';
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
import { Observable, firstValueFrom } from 'rxjs';
import { NlpRequest } from '../../core/models/nlp-request';
import { NlpService } from '../../core/services/nlp.service';
import {
  getNlpAccuracy,
  getNlpElement,
  getNlpResult,
  processNlp,
} from '../../state/global.actions';
import { selectNlpId } from '../../state/global.selectors';
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

  selectNlpId: Observable<number>;

  templates: KeyValue<string, string>[];

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private nlpService: NlpService
  ) {
    this.formGroup = new FormGroup({
      name: new FormControl<string>('Test 1', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      documentList: new FormControl<number[]>([109546], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      temperature: new FormControl<number>(0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      topP: new FormControl<number>(0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      maxTokens: new FormControl<number>(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      template: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      knowledge: new FormControl<string>('', {
        nonNullable: true,
      }),
      userContent: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

    this.selectNlpId = this.store.select(selectNlpId);

    this.templates = [
      { key: 'default', value: 'Default' },
      { key: 'genetics', value: 'Genetics' },
      { key: 'md_followup_note', value: 'MD Followup Note' },
      { key: 'pathology', value: 'Pathology' },
      { key: 'radiation', value: 'Radiation' },
    ];
  }

  handleSelectionChange(template: string) {
    this.nlpService.loadTemplate(template).subscribe((formValues) => {
      this.formGroup.patchValue({ ...formValues });
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
    const request = this.formGroup.value as NlpRequest;
    this.store.dispatch(processNlp({ request }));
  }

  async handleRefresh() {
    const nlpId = await firstValueFrom(this.store.select(selectNlpId));
    if (nlpId) {
      this.store.dispatch(getNlpResult({ nlpId }));
      this.store.dispatch(getNlpElement({ nlpId }));
      this.store.dispatch(getNlpAccuracy({ nlpId }));
    }
  }
}
