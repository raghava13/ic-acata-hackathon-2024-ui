/* eslint-disable no-param-reassign */

import { on } from '@ngrx/store';
import { createImmerReducer } from 'ngrx-immer/store';
import {
  getDocumentsFailure,
  getDocumentsSuccess,
  getNlpAccuracyFailure,
  getNlpAccuracyLatestFailure,
  getNlpAccuracyLatestSuccess,
  getNlpAccuracySuccess,
  getNlpElementFailure,
  getNlpElementSuccess,
  getNlpResultFailure,
  getNlpResultSuccess,
  hideSpinner,
  processNlp,
  processNlpFailure,
  processNlpSuccess,
  processPromptFinetuningFailure,
  processPromptFinetuningSuccess,
  resetNlpAccuracyLatest,
  showSpinner,
} from './global.actions';
import { GlobalState } from './global.models';
import { initialGlobalState } from './global.state';

export const gloablReducer = createImmerReducer<GlobalState>(
  initialGlobalState,
  on(showSpinner, (state) => {
    state.spinner += 1;
    return state;
  }),
  on(hideSpinner, (state) => {
    if (state.spinner > 0) {
      state.spinner -= 1;
    }
    return state;
  }),
  on(processNlp, (state) => {
    state.nlpId = 0;
    state.nlpResult = [];
    state.nlpElement = [];
    state.nlpAccuracy = [];
    state.nlpAccuracyLatest = [];
    return state;
  }),
  on(processNlpSuccess, (state, { nlpId }) => {
    state.nlpId = nlpId;
    return state;
  }),
  on(processNlpFailure, (state) => {
    state.nlpId = 0;
    return state;
  }),
  on(getNlpResultSuccess, (state, { nlpResult }) => {
    state.nlpResult = nlpResult;
    return state;
  }),
  on(getNlpResultFailure, (state) => {
    state.nlpResult = [];
    return state;
  }),
  on(getNlpElementSuccess, (state, { nlpElement }) => {
    state.nlpElement = nlpElement;
    return state;
  }),
  on(getNlpElementFailure, (state) => {
    state.nlpElement = [];
    return state;
  }),
  on(getNlpAccuracySuccess, (state, { nlpAccuracy }) => {
    state.nlpAccuracy = nlpAccuracy;
    return state;
  }),
  on(getNlpAccuracyFailure, (state) => {
    state.nlpAccuracy = [];
    return state;
  }),
  on(getNlpAccuracyLatestSuccess, (state, { nlpAccuracyLatest }) => {
    state.nlpAccuracyLatest = nlpAccuracyLatest;
    return state;
  }),
  on(getNlpAccuracyLatestFailure, (state) => {
    state.nlpAccuracyLatest = [];
    return state;
  }),
  on(getNlpAccuracyLatestFailure, resetNlpAccuracyLatest, (state) => {
    state.nlpAccuracyLatest = [];
    return state;
  }),
  on(processPromptFinetuningSuccess, (state, { prompt }) => {
    state.prompt = prompt;
    return state;
  }),
  on(processPromptFinetuningFailure, (state) => {
    state.prompt = '';
    return state;
  }),
  on(getDocumentsSuccess, (state, { documents }) => {
    state.documents = documents;
    return state;
  }),
  on(getDocumentsFailure, (state) => {
    state.documents = [];
    return state;
  })
);
