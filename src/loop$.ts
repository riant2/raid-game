import { interval, animationFrameScheduler, Observable } from 'rxjs';
import { switchMap, takeUntil, startWith, mapTo } from 'rxjs/operators';
import { getButtonClickEvents } from './getButtonClickEvents';

function initializeLoop(): Observable<void> {
  const [play$, pause$] = getButtonClickEvents(['game.play', 'game.pause']);

  return play$.pipe(
    startWith('autostart'),
    switchMap(_ => {
      return interval(0, animationFrameScheduler).pipe(
        takeUntil(pause$),
        mapTo(undefined)
      );
    })
  );
}

export const loop$ = initializeLoop();
