import { State } from '../interfaces/fighters/state';
import { Actions, IncreaseTurnMeters } from '../interfaces/fighters/actions';
import { map } from '../utility/dictionary';

const turnMeterFullAt = 50000;

export function fightersReducer(
  state: State = {
    canAct: {},
    list: {},
  },
  action: Actions
): State {
  switch (action.type) {
    case 'loop$.increase-turn-meters':
      return increaseTurnMeters(state, action);
    case 'loop$.actor':
      const damageTaken = action.enemy.damageTaken + action.damage;
      return {
        ...state,
        list: {
          ...state.list,
          [action.actor.id]: {
            ...action.actor,
            turnMeter: action.actor.turnMeter - 5000,
          },
          [action.enemy.id]: {
            ...action.enemy,
            damageTaken,
            isAlive: action.enemy.life > damageTaken,
          },
        },
      };
    case 'index.add-fighter':
      return {
        ...state,
        list: { ...state.list, [action.fighter.id]: action.fighter },
      };
    default:
      return state;
  }
}

function increaseTurnMeters(state: State, action: IncreaseTurnMeters): State {
  return {
    ...state,
    list: map(state.list, fighter => {
      if (!fighter.isAlive) return fighter;
      const turnMeter = fighter.turnMeter + fighter.speed;
      return { ...fighter, turnMeter, canAct: turnMeter >= turnMeterFullAt };
    }),
  };
}
