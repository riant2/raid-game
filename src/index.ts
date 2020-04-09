import { loop$ } from './loop$';
import { Team } from './interfaces/teams/team';
import { random } from './random';
import { store$ } from './store';
import { v4 as uuid } from 'uuid';
import { teamsSelector } from './selectors/teams';
import { Fighter } from './interfaces/fighters/fighter';
import { fightersSelector } from './selectors/fighters';
import { ENEMIES, DAMAGE, ALL, ALLIES } from './constants';

const pres = document.getElementsByTagName('pre');

store$.dispatch({ type: 'index.add-team', team: createRandomTeam(0) });
store$.dispatch({ type: 'index.add-team', team: createRandomTeam(1) });

loop$.subscribe(_ => {
  store$.dispatch({ type: 'loop$.increase-turn-meters' });
  const state = store$.getState();
  const teams = teamsSelector(state);

  teams.forEach(
    (team, i) => (pres[i].innerText = JSON.stringify(team, null, 2))
  );

  const [actor] = Object.values(state.fighters.list)
    .filter(fighter => fighter.canAct)
    .sort((a, b) => {
      if (a.turnMeter === b.turnMeter) return a.speed - b.speed;
      return a.turnMeter - b.turnMeter;
    });

  if (actor) {
    executeAction(actor);
  }
});

function executeAction(actor: Fighter) {
  const action = decideAction(actor);
  action.effects.reduce((result, effect) => {
    const [team, num] = effect.targets;
    switch (effect.type) {
      case DAMAGE:
      default:
        const enemies = getFighters(actor, team, num);
        break;
    }
    return {};
  }, {});
}

function decideAction(actor: Fighter) {
  const [action] = actor.actions.filter(action => action.tick === 0);
  return action;
}

function calculateDamage(
  { attack: att }: Fighter,
  { defense: def }: Fighter
): number {
  const [min, max] =
    att >= def ? [att, att + (att - def)] : [att - (def - att), att];
  const base = random(min, max);
  const damage = Math.max(Math.floor((base * att) / (def * 2)), 0);
  const reduction = percent(1 - damage / base);
  console.log({ att, def, damage, base, reduction, min, max });
  return damage;
}

function percent(num: number) {
  return Math.round(num * 100) + '%';
}

function getFighters(
  attacker: Fighter,
  team: typeof ALLIES | typeof ENEMIES,
  amount: number | typeof ALL,
  unique = false
): Fighter[] {
  const fighters1 = fightersSelector(store$.getState()).filter(
    f =>
      (team === ALLIES
        ? f.teamId === attacker.teamId
        : f.teamId !== attacker.teamId) && f.isAlive
  );
  if (amount === ALL) return fighters1;

  const fighters2: Fighter[] = [];
  while (fighters2.length > amount) {
    const fighter = fighters1[random(0, fighters1.length)];
    if (unique && fighters2.some(f => f === fighter)) continue;
    fighters2.push(fighter);
  }
  return fighters2;
}

console.log(store$.getState());

function createRandomFighter(teamId: string): string {
  const fighter: Fighter = {
    attack: random(4, 16),
    canAct: false,
    damageTaken: 0,
    defense: random(4, 16),
    id: uuid(),
    isAlive: true,
    life: random(80, 160),
    speed: random(80, 160),
    teamId,
    turnMeter: 0,

    actions: [
      {
        cooldown: 3,
        name: 'area attack',
        tick: 0,
        effects: [
          {
            multipliers: { damage: 0.5 },
            targets: [ENEMIES, ALL],
            type: DAMAGE,
            times: 1,
          },
        ],
      },
      {
        cooldown: 2,
        name: 'power attack',
        tick: 0,
        effects: [
          {
            multipliers: { damage: 1.5 },
            targets: [ENEMIES, 1],
            type: DAMAGE,
            times: 1,
          },
        ],
      },
      {
        cooldown: 0,
        name: 'basic attack',
        tick: 0,
        effects: [
          {
            multipliers: { damage: 1 },
            targets: [ENEMIES, 1],
            times: 1,
            type: DAMAGE,
          },
        ],
      },
    ],
  };
  store$.dispatch({ type: 'index.add-fighter', fighter });
  return fighter.id;
}

function createRandomTeam(name: number): Team {
  const id = uuid();
  const fighterIds = [
    createRandomFighter(id),
    createRandomFighter(id),
    createRandomFighter(id),
    createRandomFighter(id),
    createRandomFighter(id),
  ];
  return {
    id,
    name,
    fighterIds,
  };
}
