import { createAction, props } from '@ngrx/store';
import { NlpRequest } from '../core/models/nlp-request';

export const processNLP = createAction(
  '[NLP] Process NLP',
  props<{ request: NlpRequest }>()
);

export const processNLPSuccess = createAction('[NLP] Process NLP Success');

export const processNLPFailure = createAction('[NLP] Process NLP Failure');
