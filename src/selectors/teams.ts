import { createSelector } from 'reselect';
import { AppState } from '../store';
import { fightersSelector } from './fighters';

export const teamsSelector = createSelector(
  fightersSelector,
  state => Object.values(state.teams.list),
  (fighters, teams) =>
    teams.map(team => ({
      id: team.id,
      fighters: fighters.filter(fighter =>
        team.fighterIds.some(id => fighter.id === id)
      ),
    }))
);
