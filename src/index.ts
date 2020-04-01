import { loop$ } from './loop$';
import { Team } from './interfaces/teams/team';
import { random } from './random';
import { store$ } from './store';
import { filter, map } from './utility/dictionary';
import { v4 as uuid } from 'uuid';
import { teamsSelector } from './selectors/teams';
import { Fighter } from './interfaces/fighters/fighter';
import { fightersSelector } from './selectors/fighters';

const pres = document.getElementsByTagName('pre');

//store$.subscribe(() => console.log(store$.getState()));
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
    const enemy = getRandomEnemy(actor);
    if (enemy) {
      store$.dispatch({
        type: 'loop$.actor',
        actor,
        enemy,
        damage: getDamage(actor, enemy),
      });
    }
  }
});

function getDamage(
  { attack: att }: Fighter,
  { defense: def }: Fighter
): number {
  const [min, max] =
    att >= def ? [att, att + (att - def)] : [att - (def - att), att];
  const base = random(min, max);
  const damage = Math.floor((base * att) / (def * 2));
  const reduction = percent(1 - damage / base);
  console.log({ att, def, damage, base, reduction, min, max });
  return damage;
}

function percent(num: number) {
  return Math.round(num * 100) + '%';
}

function getRandomEnemy(attacker: Fighter) {
  const [fighter] = fightersSelector(store$.getState()).filter(
    f => f.teamId !== attacker.teamId && f.isAlive
  );
  return fighter;
}

console.log(store$.getState());

function createRandomFighter(teamId: string): string {
  const fighter = {
    attack: random(8, 16),
    damageTaken: 0,
    defense: random(8, 16),
    canAct: false,
    id: uuid(),
    life: random(80, 160),
    speed: random(80, 160),
    turnMeter: 0,
    teamId,
    isAlive: true,
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
