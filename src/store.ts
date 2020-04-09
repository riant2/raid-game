import {
  createStore,
  combineReducers,
  Dispatch,
  ActionFromReducer,
} from 'redux';
import { fightersReducer } from './reducers/fighters';
import { teamsReducer } from './reducers/teams';

const reducers = combineReducers({
  teams: teamsReducer,
  fighters: fightersReducer,
});

export type AppState = ReturnType<typeof reducers>;
export type AppDispatcher = Dispatch<ActionFromReducer<typeof reducers>>;

export const store$ = createStore(reducers);
