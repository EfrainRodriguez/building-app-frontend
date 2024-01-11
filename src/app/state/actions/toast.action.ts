import { createAction } from '@ngrx/store';

export const showToast = createAction(
  '[Toast] Show Toast',
  (message: string, mode: string) => ({ message, mode })
);

export const hideToast = createAction('[Toast] Hide Toast');
