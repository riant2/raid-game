import { Team } from './team';

export interface AddTeam {
  type: 'index.add-team';
  team: Team;
}

export type TeamsActions = AddTeam;
