import { getSymbolObservable } from 'rxjs/symbol/observable';
import { Observable, ObservableInput } from 'rxjs/Observable';
import { IScheduler } from 'rxjs/Scheduler';
import { Subscriber } from 'rxjs/Subscriber';
import { TeardownLogic } from 'rxjs/Subscription';

export class FromParentContextObservable<T> extends Observable<T> {
  constructor(subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic) {
    super(subscribe);
  }

  // static create<T>(subscribe?: (subscriber: Subscriber<T>) => TeardownLogic): Observable<T> {
  //   return new Observable<T>(subscribe);
  // }
}

function identyFunc<T>(this: Observable<T>): Observable<T> {
  return this;  
}

let w = window;
while (w) {
  const symObs = getSymbolObservable(w);
  (<any>FromParentContextObservable.prototype)[symObs] = identyFunc;
  w = w.opener;
}
