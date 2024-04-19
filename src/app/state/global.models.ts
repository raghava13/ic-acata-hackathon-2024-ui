import { NlpAccuracy } from '../core/models/nlp-accuracy';
import { NlpResult } from '../core/models/nlp-result';

export interface GlobalState {
  nlpId: number;
  nlpResult: NlpResult[];
  nlpAccuracy: NlpAccuracy[];
  nlpAccuracyLatest: NlpAccuracy[];
  prompt: string;
}
