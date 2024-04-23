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

export const selectDocumentFiltered = (keyword: string) =>
  createSelector(selectGlobalFeatureState, (state) => {
    console.log('raghava1', keyword);
    const documentId = parseInt(keyword);
    const [div, id] = keyword.split('_');
    if (documentId && documentId.toString() === keyword) {
      return state.documents.filter((document) =>
        document.documentId.toString().startsWith(documentId.toString())
      );
    } else if (div && id) {
      return state.documents.filter((document) =>
        document.patientId.startsWith(keyword)
      );
    } else if (keyword) {
      return state.documents.filter(
        (document) =>
          document.type.toLowerCase().indexOf(keyword) > -1 ||
          document.name.toLocaleLowerCase().indexOf(keyword) > -1
      );
    } else {
      return state.documents;
    }
  });
