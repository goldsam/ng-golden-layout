import { EmitToSubscriber } from './EmitToSubscriber';
import { EventEmitter } from 'golden-layout';
import { Subscriber } from 'rxjs/Subscriber'

export function emitTo<T>(eventEmitter: EventEmitter, eventName: string): Subscriber<T> {
  return new EmitToSubscriber<T>(eventEmitter, eventName);
}
