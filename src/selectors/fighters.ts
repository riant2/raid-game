import { AppState } from '../store';

export const fightersSelector = (state: AppState) =>
  Object.values(state.fighters.list);
