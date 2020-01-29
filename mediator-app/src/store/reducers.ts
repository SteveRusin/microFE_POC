import { createReducer, on, Action } from '@ngrx/store';
import { click } from './actions';

export const initialState = Math.random();

const shellApp = createReducer(
  initialState,
  on(
    click,
    state => {
      return Math.random();
    }
  ),
);

export function getShellAppReducer(state: number, action: Action) {
  return shellApp(state, action);
}
