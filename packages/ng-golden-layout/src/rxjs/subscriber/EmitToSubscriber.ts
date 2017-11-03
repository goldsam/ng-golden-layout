import { Subscriber } from 'rxjs/Subscriber';
import { EventEmitter } from 'golden-layout'

export class EmitToSubscriber<T> extends Subscriber<T> {
  constructor(private eventEmitter: EventEmitter, private eventName: string) {
    super();
  }

  protected _next(value: T): void {
    this.eventEmitter.emit('next', value);
  }

  protected _error(err: any): void {
    this.eventEmitter.emit('error', err);
  }

  protected _complete(): void {
    this.eventEmitter.emit('complete');
  }
}
