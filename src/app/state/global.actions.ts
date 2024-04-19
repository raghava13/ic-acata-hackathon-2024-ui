import { createAction, props } from '@ngrx/store';
import { NlpAccuracy } from '../core/models/nlp-accuracy';
import { NlpRequest } from '../core/models/nlp-request';
import { NlpResult } from '../core/models/nlp-result';
import { PromptRequest } from '../core/models/prompt-request';

export const showSpinner = createAction('[Spinner] Show Spinner');

export const hideSpinner = createAction('[Spinner] Hide Spinner');

export const processNlp = createAction(
  '[NLP] Process NLP',
  props<{ request: NlpRequest }>()
);

export const processNlpSuccess = createAction(
  '[NLP] Process NLP Success',
  props<{ nlpId: number }>()
);

export const processNlpFailure = createAction('[NLP] Process NLP Failure');

export const getNlpResult = createAction(
  '[NLP] Get NLP Result',
  props<{ nlpId: number }>()
);

export const getNlpResultSuccess = createAction(
  '[NLP] Get NLP Result Success',
  props<{ nlpResult: NlpResult[] }>()
);

export const getNlpResultFailure = createAction('[NLP] Get NLP Result Failure');

export const getNlpAccuracy = createAction(
  '[NLP] Get NLP Accuracy',
  props<{ nlpId: number }>()
);

export const getNlpAccuracySuccess = createAction(
  '[NLP] Get NLP Accuracy Success',
  props<{ nlpAccuracy: NlpAccuracy[] }>()
);

export const getNlpAccuracyFailure = createAction(
  '[NLP] Get NLP Accuracy Failure'
);

export const getNlpAccuracyLatest = createAction(
  '[NLP] Get NLP Accuracy Latest',
  props<{ elementName?: string }>()
);

export const getNlpAccuracyLatestSuccess = createAction(
  '[NLP] Get NLP Accuracy Latest Success',
  props<{ nlpAccuracyLatest: NlpAccuracy[] }>()
);

export const getNlpAccuracyLatestFailure = createAction(
  '[NLP] Get NLP Accuracy Latest Failure'
);

export const processPromptFinetuning = createAction(
  '[Prompt] Process Prompt Fine-tuning',
  props<{ request: PromptRequest }>()
);

export const processPromptFinetuningSuccess = createAction(
  '[Prompt] Process Prompt Fine-tuning Success',
  props<{ prompt: string }>()
);

export const processPromptFinetuningFailure = createAction(
  '[Prompt] Process Prompt Fine-tuning Failure'
);
