import { ClipboardModule } from '@angular/cdk/clipboard';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PromptRequest } from '../../core/models/prompt-request';
import { processPromptFinetuning } from '../../state/global.actions';
import { selectPrompt } from '../../state/global.selectors';
import { NlpAccuracyComponent } from '../nlp-accuracy/nlp-accuracy.component';
import { NlpResultComponent } from '../nlp-result/nlp-result.component';

@Component({
  selector: 'app-prompt-tuning',
  standalone: true,
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
    ClipboardModule,
  ],
  templateUrl: './prompt-tuning.component.html',
  styleUrl: './prompt-tuning.component.scss',
})
export class PromptTuningComponent {
  formGroup: FormGroup<{
    template: FormControl<string>;
    context: FormControl<string>;
    knowledge: FormControl<string>;
    userContent: FormControl<string>;
  }>;

  template: string;

  context: string;

  knowledge: string;

  userContent: string;

  selectPrompt: Observable<string>;

  constructor(private store: Store) {
    this.template = `As a Prompt Engineer, your task is to optimize prompts. Please analyze the provided context and apply the relevant knowledge. 
    Knowledge: {knowledge}. 
    Context: {context}`;

    this.context = `
    You are a Clinical Genomic Data Curator trained in medical oncology analyzing the clinical notes of patients. 
        Analyze the clinical notes given in the "Context" and make use of "Knowledge". 
        Reply "["None"]" when not found. No additional information is required. 
        Response as JSON with snake case, elements as an array. 
        Knowledge: {knowledge}. 
        Context: {context}
    
    Extract following elements date of biopsy, specimen collection date`;

    this.knowledge = ``;

    // this.userContent = `Extract cancer stage, radiation type, site of biopsy`;
    this.userContent = `Optimize given prompt`;

    this.formGroup = new FormGroup({
      template: new FormControl<string>(this.template, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      context: new FormControl<string>(this.context, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      knowledge: new FormControl<string>(this.knowledge, {
        nonNullable: true,
      }),
      userContent: new FormControl<string>(this.userContent, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

    this.selectPrompt = store.select(selectPrompt);
  }

  handleReset() {
    this.formGroup.reset();
  }

  handleClear() {
    this.formGroup.patchValue({
      template: '',
      context: '',
      knowledge: '',
      userContent: '',
    });
  }

  handleProcess() {
    const request = this.formGroup.value as PromptRequest;
    this.store.dispatch(processPromptFinetuning({ request }));
  }
}
