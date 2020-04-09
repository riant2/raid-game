import { Effect } from './effect';
import { When } from '../../enums/when';

export interface Action {
  cooldown: number;
  effects: Effect[];
  name: string;
  tick: number;
}
