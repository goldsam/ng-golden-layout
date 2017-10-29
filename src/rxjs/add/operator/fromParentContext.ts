import { Observable } from 'rxjs/Observable';
import { fromParentContext } from '../../operator/fromParentContext';

Observable.prototype.fromParentContext = fromParentContext;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    fromParentContext: typeof fromParentContext;
  }
}