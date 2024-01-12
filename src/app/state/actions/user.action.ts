import { createAction } from '@ngrx/store';

export const changeUserType = createAction(
  '[User] Change User Type',
  (userType: string) => ({ userType })
);
