import { Action } from './action';

export interface Fighter {
  actions: Action[];
  attack: number;
  canAct: boolean;
  damageTaken: number;
  defense: number;
  id: string;
  isAlive: boolean;
  life: number;
  speed: number;
  turnMeter: number;
  teamId: string;
}
