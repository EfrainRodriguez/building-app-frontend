import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { getUserType } from 'src/app/state/selectors/user.selector';
import { AppState } from 'src/app/state/app.state';
import { changeUserType } from 'src/app/state/actions/user.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  userType$ = this.store.select(getUserType);
  options = [
    { value: 'BUILDER', label: 'Builder' },
    { value: 'PROVIDER', label: 'Provider' },
  ];

  constructor(private store: Store<AppState>) {}

  changeUserTypeOption(event: any) {
    this.store.dispatch(changeUserType(event.target.value));
  }
}
