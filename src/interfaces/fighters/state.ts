import { Fighter } from './fighter';
import { Dictionary } from '../dictionary';

export interface State {
  canAct: Dictionary<Fighter>;
  list: Dictionary<Fighter>;
}
