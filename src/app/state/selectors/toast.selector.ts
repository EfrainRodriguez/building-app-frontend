import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AppState } from '../app.state';

const getToastFeatureState = (state: AppState) => state.toast;

export const getToastMessage = createSelector(
  getToastFeatureState,
  (state) => state.message
);

export const getToastVisibility = createSelector(
  getToastFeatureState,
  (state) => state.isVisible
);

export const getToastMode = createSelector(
  getToastFeatureState,
  (state) => state.mode
);

export const getToastState = createSelector(
  getToastFeatureState,
  (state) => state
);
