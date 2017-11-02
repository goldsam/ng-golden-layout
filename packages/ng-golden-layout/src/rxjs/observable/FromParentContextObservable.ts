import { getSymbolObservable } from 'rxjs/symbol/observable';
import { Observable, ObservableInput } from 'rxjs/Observable';
import { IScheduler } from 'rxjs/Scheduler';
import { Subscriber } from 'rxjs/Subscriber';
import { TeardownLogic } from 'rxjs/Subscription';

export class FromParentContextObservable<T> extends Observable<T> {
  constructor(private ish: Observable<T>) {
    super(null);
    console.log('invoking FromParentContextObservable.constructor(subscriber: Subscriber<T>)');
  }

  protected _subscribe(subscriber: Subscriber<T>) {
    console.log('invoking FromParentContextObservable.prototype._subscribe(subscriber: Subscriber<T>)');

    const ish: any = this.ish;

    let w = window;
    while (w) {
      const symObs = getSymbolObservable(w);
      if(typeof ish[symObs] === 'function') {
        return ish[symObs]().subscribe(subscriber);
      }
      w = w.opener;
    }

    throw new Error('crap!');
  }
}

function identyFunc<T>(this: Observable<T>): Observable<T> {
  console.log('invoking identyFunc<T>(this: Observable<T>)');   
  return this;
}

let w = window;
while (w) {
  const symObs = getSymbolObservable(w);
  (<any>FromParentContextObservable.prototype)[symObs] = identyFunc;
  w = w.opener;
}
