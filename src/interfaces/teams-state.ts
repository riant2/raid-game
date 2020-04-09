import { Team } from './teams/team';
import { Dictionary } from './dictionary';

export interface TeamsState {
  list: Dictionary<Team>;
}
