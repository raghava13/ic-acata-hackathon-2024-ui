import { GlobalState } from './global.models';

export const initialGlobalState: GlobalState = {
  spinner: 0,
  nlpResult: [],
  nlpElement: [],
  nlpAccuracy: [],
  nlpAccuracyLatest: [],
  prompt: '',
  documents: [],
};
