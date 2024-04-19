import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GlobalState } from './global.models';

export const selectGlobalFeatureState =
  createFeatureSelector<GlobalState>('global');

export const selectNlpId = createSelector(
  selectGlobalFeatureState,
  (state) => state.nlpId
);

export const selectNlpResult = createSelector(
  selectGlobalFeatureState,
  (state) => state.nlpResult
);

export const selectNlpAccuracy = createSelector(
  selectGlobalFeatureState,
  (state) => state.nlpAccuracy
);

export const selectNlpAccuracyLatest = createSelector(
  selectGlobalFeatureState,
  (state) => state.nlpAccuracyLatest
);
