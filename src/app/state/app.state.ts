import { ToastState } from "./reducers/toast.reducer";
import { UserState } from "./reducers/user.reducer";

export interface AppState {
  toast: ToastState;
  user: UserState;
}