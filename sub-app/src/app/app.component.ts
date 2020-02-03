import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { decrement, increment, AppState, getCount } from 'src/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class SubAppComponent {
//  count$ = this.store.select(getCount);

  constructor(
//    private store: Store<AppState>,
  ) {}

  add() {
   // this.store.dispatch(increment());
  }

  subtract() {
  //  this.store.dispatch(decrement());
  }
}
