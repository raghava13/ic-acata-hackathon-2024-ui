import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GlobalState } from './global.models';

export const selectGlobalFeatureState =
  createFeatureSelector<GlobalState>('global');

export const selectSpinner = createSelector(
  selectGlobalFeatureState,
  (state) => state.spinner
);

export const selectNlpResult = createSelector(
  selectGlobalFeatureState,
  (state) => state.nlpResult
);

export const selectNlpElement = createSelector(
  selectGlobalFeatureState,
  (state) => state.nlpElement
);

export const selectNlpAccuracy = createSelector(
  selectGlobalFeatureState,
  (state) => state.nlpAccuracy
);

export const selectNlpAccuracyLatest = createSelector(
  selectGlobalFeatureState,
  (state) => state.nlpAccuracyLatest
);

export const selectPrompt = createSelector(
  selectGlobalFeatureState,
  (state) => state.prompt
);

export const selectDocuments = createSelector(
  selectGlobalFeatureState,
  (state) => state.documents
);
