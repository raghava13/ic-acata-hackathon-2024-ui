import { GlobalState } from './global.models';

export const initialGlobalState: GlobalState = {
  spinner: 0,
  nlpId: 0,
  nlpResult: [],
  nlpAccuracy: [],
  nlpAccuracyLatest: [],
  prompt: '',
  documents: [],
};
