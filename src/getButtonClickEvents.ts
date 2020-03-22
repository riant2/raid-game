import { fromEvent, Observable } from 'rxjs';

export function getButtonClickEvents(
  buttonIds: string[]
): Array<Observable<Event>> {
  const events = buttonIds.map(id => {
    const element = document.getElementById(id);
    return fromEvent(element!, 'click');
  });
  return events;
}
