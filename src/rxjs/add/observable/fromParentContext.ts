import { Observable } from 'rxjs/Observable';
import { fromParentContext as staticFromParentContext } from '../../observable/fromParentContext';

Observable.fromParentContext = staticFromParentContext;

declare module 'rxjs/Observable' {
  namespace Observable {
    export let fromParentContext: typeof staticFromParentContext;
  }
}
