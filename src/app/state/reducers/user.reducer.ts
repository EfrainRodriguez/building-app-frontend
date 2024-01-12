import { createReducer, on } from '@ngrx/store';

import { changeUserType } from '../actions/user.action';

export interface UserState {
  userType: string;
}

export const initialState: UserState = {
  userType: 'BUILDER',
};

export const userReducer = createReducer(
  initialState,
  on(changeUserType, (state, { userType }) => ({
    ...state,
    userType,
  }))
);
