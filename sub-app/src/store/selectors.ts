import { AppState } from './models';
import { createSelector } from '@ngrx/store';

export const getAppState = (state: AppState) => state;

export const getCount = createSelector(
  getAppState,
  state => state.count
);
