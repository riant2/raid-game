import { Fighter } from './fighter';

export interface IncreaseTurnMeters {
  type: 'loop$.increase-turn-meters';
}

export interface AddFighter {
  type: 'index.add-fighter';
  fighter: Fighter;
}

export interface Actor {
  type: 'loop$.actor';
  actor: Fighter;
  enemy: Fighter;
  damage: number;
}

export type ReducerActions = IncreaseTurnMeters | AddFighter | Actor;
