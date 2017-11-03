import { ListenOnObservable } from './ListenOnObservable';
import { EventEmitter } from 'golden-layout';
import { Observable } from 'rxjs/Observable'

export function listenOn<T>(eventEmitter: EventEmitter, eventName: string): Observable<T> {
  return new ListenOnObservable<T>(eventEmitter, eventName);
}
