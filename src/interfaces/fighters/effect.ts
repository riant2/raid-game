import { EffectTypes } from '../../enums/effect-types';
import { ALL, ALLIES, ENEMIES, DAMAGE, HEAL } from '../../constants';

export interface Effect {
  multipliers: { damage: number };
  targets: [typeof ENEMIES | typeof ALLIES, typeof ALL | number];
  times: number;
  type: typeof HEAL | typeof DAMAGE;
}
