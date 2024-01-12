import { createSelector } from '@ngrx/store';

import { AppState } from '../app.state';

const getUserFeatureState = (state: AppState) => state.user;

export const getUserType = createSelector(
  getUserFeatureState,
  (state) => state.userType
);
