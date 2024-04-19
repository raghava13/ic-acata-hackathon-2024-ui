/* eslint-disable no-param-reassign */

import { on } from '@ngrx/store';
import { createImmerReducer } from 'ngrx-immer/store';
import {
  getNlpAccuracyFailure,
  getNlpAccuracyLatestFailure,
  getNlpAccuracyLatestSuccess,
  getNlpAccuracySuccess,
  getNlpResultFailure,
  getNlpResultSuccess,
  processNlp,
  processNlpFailure,
  processNlpSuccess,
} from './global.actions';
import { GlobalState } from './global.models';
import { initialGlobalState } from './global.state';

export const gloablReducer = createImmerReducer<GlobalState>(
  initialGlobalState,
  on(processNlp, (state) => {
    state.nlpId = 0;
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
  })
);
