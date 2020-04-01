import { TeamsState } from '../interfaces/teams-state';
import { TeamsActions } from '../interfaces/teams/actions';

export function teamsReducer(
  state: TeamsState = { list: {} },
  action: TeamsActions
): TeamsState {
  switch (action.type) {
    case 'index.add-team':
      return {
        ...state,
        list: { ...state.list, [action.team.id]: action.team },
      };
    default:
      return state;
  }
}
