import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { TeardownLogic } from 'rxjs/Subscription';
import { FromParentContextObservable } from '../observable/FromParentContextObservable';
import { fromParentContext as createFromParentContext } from '../observable/fromParentContext';

export function fromParentContext<T>(this: Observable<T>): Observable<T> {  
  console.log('invoking fromParentContext<T>(this: Observable<T>)');
  return new FromParentContextObservable(this);
}

