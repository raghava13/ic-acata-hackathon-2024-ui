import { Document } from '../core/models/document';
import { NlpAccuracy } from '../core/models/nlp-accuracy';
import { NLPElement } from '../core/models/nlp-element';
import { NlpResult } from '../core/models/nlp-result';

export interface GlobalState {
  spinner: number;
  nlpId: number;
  nlpResult: NlpResult[];
  nlpElement: NLPElement[];
  nlpAccuracy: NlpAccuracy[];
  nlpAccuracyLatest: NlpAccuracy[];
  prompt: string;
  documents: Document[];
}
