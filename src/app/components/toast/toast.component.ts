import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import {
  getToastMessage,
  getToastMode,
} from 'src/app/state/selectors/toast.selector';
import { hideToast } from 'src/app/state/actions/toast.action';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  message$ = this.store.select(getToastMessage);
  mode$ = this.store.select(getToastMode);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.message$.subscribe((message) => {
      if (message) {
        setTimeout(() => {
          this.onHideToast();
        }, 3000);
      }
    });
  }

  onHideToast() {
    this.store.dispatch(hideToast());
  }
}
