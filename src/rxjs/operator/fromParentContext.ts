import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { TeardownLogic } from 'rxjs/Subscription';
import { FromParentContextObservable } from '../observable/FromParentContextObservable';

class FromParentContextOperator<T> implements Operator<T, T> {
  call(subscriber: Subscriber<T>, source: any): TeardownLogic {
    return source.subscribe(FromParentContextObservable.create(subscriber));
  }
}

export function fromParentContext<T>(this: Observable<T>): Observable<T> {  
  return this.lift(new FromParentContextOperator());
}

