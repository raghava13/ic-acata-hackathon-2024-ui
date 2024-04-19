import { Document } from '../core/models/document';
import { NlpAccuracy } from '../core/models/nlp-accuracy';
import { NlpResult } from '../core/models/nlp-result';

export interface GlobalState {
  spinner: number;
  nlpId: number;
  nlpResult: NlpResult[];
  nlpAccuracy: NlpAccuracy[];
  nlpAccuracyLatest: NlpAccuracy[];
  prompt: string;
  documents: Document[];
}
