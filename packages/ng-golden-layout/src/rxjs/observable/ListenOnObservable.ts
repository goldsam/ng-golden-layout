import { Observable } from 'rxjs/Observable'
import { TeardownLogic, AnonymousSubscription } from 'rxjs/Subscription';
import { Subscriber } from 'rxjs/Subscriber';
import { EventEmitter } from 'golden-layout'

class ListenOnSubscription<T> implements AnonymousSubscription {
  constructor(private observable: ListenOnObservable<T>, private subscriber: Subscriber<T>) {
  }
  
  public subscribe(): AnonymousSubscription {
    this.observable.eventEmitter.on(this.observable.eventName, this._emit, this);
    return this;
  }

  public unsubscribe(): void {
    const observablue = this.observable;
    this.observable = null;
    this.observable.eventEmitter.off(this.observable.eventName, this._emit, this);
  }

  protected _emit(type: string, value: any) : void {
    switch(type) {
      case 'next': 
        return this.subscriber.next(value);
      case 'complete':
        return this.subscriber.complete();
      case 'error':
        return this.subscriber.error(value);
      default:
        return this.subscriber.error(value || new Error('Unknown event type'));
    }
  }
}

export class ListenOnObservable<T> extends Observable<T> {
  constructor(public readonly eventEmitter: EventEmitter, public readonly eventName: string) {
    super();
  }

  protected _subscribe(subscriber: Subscriber<any>): TeardownLogic {
    return new ListenOnSubscription<T>(this, subscriber).subscribe();
  }
}
