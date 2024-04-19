import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';
import { NlpRequest } from '../../core/models/nlp-request';
import {
  getNlpAccuracy,
  getNlpResult,
  processNlp,
} from '../../state/global.actions';
import { selectNlpId } from '../../state/global.selectors';
import { NlpAccuracyComponent } from '../nlp-accuracy/nlp-accuracy.component';
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
  ],
})
export class HomeComponent {
  formGroup: FormGroup<{
    name: FormControl<string>;
    documentList: FormControl<number[]>;
    template: FormControl<string>;
    knowledge: FormControl<string>;
    userContent: FormControl<string>;
  }>;

  template: string;

  knowledge: string;

  userContent: string;

  selectNlpId: Observable<number>;

  constructor(private store: Store) {
    this.template = `You are a Clinical Genomic Data Curator trained in medical oncology analyzing the clinical notes of patients. 
    Analyze the clinical notes given in the "Context" and make use of "Knowledge". 
    Reply "["None"]" when not found. No additional information is required. 
    Response as JSON with snake case, elements as an array. 
    Knowledge: {knowledge}. 
    Context: {context}`;

    this.knowledge = `Cancer Stage: Cancer stages are Stage IIB, Stage IVA, and return latest stage.

    Radiation Type: Radiation Type is the energy used for treatment (exclude site of treatment like 'lung') with possible values of 6X, 10X, 18X, etc.
    
    Site of Biopsy: A biopsy is a procedure where cells or tissue are removed for examination to determine a diagnosis. The site of the biopsy is the anatomical location where the biopsy was performed or the anatomical location where the tissue was removed from.`;

    // this.userContent = `Extract cancer stage, radiation type, site of biopsy`;
    this.userContent = `Extract following elements date of biopsy, specimen collection date`;

    this.formGroup = new FormGroup({
      name: new FormControl<string>('Radiation Test 1', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      documentList: new FormControl<number[]>([736353], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      template: new FormControl<string>(this.template, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      knowledge: new FormControl<string>(this.knowledge, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      userContent: new FormControl<string>(this.userContent, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

    this.selectNlpId = this.store.select(selectNlpId);
  }

  removeDocumentId(documentId: number) {
    const index = this.formGroup.value.documentList?.indexOf(documentId) || 0;
    if (index >= 0) {
      this.formGroup.value.documentList?.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    const documetnId = parseInt(value);

    // Add our keyword
    if (!isNaN(documetnId)) {
      this.formGroup.value.documentList?.push(documetnId);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  handleReset() {
    this.formGroup.reset();
  }

  handleClear() {
    this.formGroup.patchValue({
      name: '',
      documentList: [],
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
      this.store.dispatch(getNlpAccuracy({ nlpId }));
    }
  }
}
