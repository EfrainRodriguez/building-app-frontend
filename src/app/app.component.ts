import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './state/app.state';
import { getToastVisibility } from './state/selectors/toast.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  visible$ = this.store.select(getToastVisibility);

  constructor(private store: Store<AppState>) {}

}
