import { Subscriber } from 'rxjs/Subscriber';
import { emitTo as staticEmitTo } from '../../subscriber/emitTo';

Subscriber.emitTo = staticEmitTo;

declare module 'rxjs/Subscriber' {
  namespace Subscriber {
    export let emitTo: typeof staticEmitTo;
  }
}
