import { Observable } from 'rxjs/Observable';
import { listenOn as staticListenOn } from '../../observable/listenOn';

Observable.listenOn = staticListenOn;

declare module 'rxjs/Observable' {
  namespace Observable {
    export let listenOn: typeof staticListenOn;
  }
}
