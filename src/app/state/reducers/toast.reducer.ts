import { createReducer, on } from '@ngrx/store';

import { showToast, hideToast } from '../actions/toast.action';

export interface ToastState {
  message: string;
  isVisible: boolean;
  mode: string;
}

export const initialState: ToastState = {
  message: '',
  isVisible: false,
  mode: 'success',
};

export const toastReducer = createReducer(
  initialState,
  on(showToast, (state, { message, mode }) => ({
    ...state,
    mode,
    message,
    isVisible: true,
  })),
  on(hideToast, (state) => ({
    ...state,
    message: '',
    mode: 'success',
    isVisible: false,
  }))
);
