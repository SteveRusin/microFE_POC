import { AppState } from './models';
import { createSelector } from '@ngrx/store';

export const getAppState = (state: AppState) => state;

export const getShellAppState = createSelector(
  getAppState,
  state => state.shellApp
);
