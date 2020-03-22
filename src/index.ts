import {
  interval,
  animationFrameScheduler,
  fromEvent,
  combineLatest,
  of,
  zip,
  merge,
  Observable,
} from 'rxjs';
import {
  switchMap,
  takeUntil,
  timeout,
  combineAll,
  startWith,
} from 'rxjs/operators';

function game() {
  const [play$, pause$] = getButtonClickEvents(['game.play', 'game.pause']);

  play$
    .pipe(
      startWith('autostart'),
      switchMap(_ => {
        return interval(0, animationFrameScheduler).pipe(takeUntil(pause$));
      })
    )
    .subscribe(() => {
      console.log('a');
    });
}

function getButtonClickEvents(buttonIds: string[]): Array<Observable<Event>> {
  const events = buttonIds.map(id => {
    const element = document.getElementById(id);
    return fromEvent(element!, 'click');
  });
  return events;
}

game();
