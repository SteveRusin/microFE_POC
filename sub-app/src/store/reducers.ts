import { createReducer, on, Action } from '@ngrx/store';
import { CountState } from './models';
import { decrement, increment } from './actions';

export const initialState: CountState = 0;

const subAppReducer = createReducer(
  initialState,
  on(
    increment,
    state => {
      return state + 1;
    }
  ),
  on(
    decrement,
    state => state - 1,
  )
);

export function getSubAppReducer(state: CountState, action: Action) {
  console.log('TCL: getSubAppReducer -> action', action)
  console.log('TCL: getSubAppReducer -> state', state)
  return subAppReducer(state, action);
}
