import { Component, SkipSelf } from '@angular/core';
import { Store } from '@ngrx/store';

import { decrement, increment, AppState, getCount } from 'src/store';
import { ShellStore } from './app.module';
@Component({
  selector: 'app-root-1',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class SubAppComponent {
  count$ = this.store.select(getCount);
  shellState$ = this.shellStore;

  constructor(
    private store: Store<AppState>,
    private shellStore: ShellStore,
  ) {}

  add() {
    this.store.dispatch(increment());
  }

  subtract() {
    this.store.dispatch(decrement());
  }
}
