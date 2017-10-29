import { FromParentContextObservable } from './FromParentContextObservable';
import { Subscriber } from 'rxjs/Subscriber';
import { TeardownLogic } from 'rxjs/Subscription';

export function fromParentContext<T>(subscribe?: (subscriber: Subscriber<T>) => TeardownLogic) {
  return new FromParentContextObservable<T>(subscribe);
}
