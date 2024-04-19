import { createAction, props } from '@ngrx/store';
import { NlpAccuracy } from '../core/models/nlp-accuracy';
import { NlpRequest } from '../core/models/nlp-request';
import { NlpResult } from '../core/models/nlp-result';

export const processNlp = createAction(
  '[NLP] Process NLP',
  props<{ request: NlpRequest }>()
);

export const processNlpSuccess = createAction('[NLP] Process NLP Success');

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
