import * as GoldenLayout from 'golden-layout';

/**
 * @whatItDoes Lifecycle hook that is called after a component has been created
 * but before it is added to its parent container.
 */
export abstract class GlOnInit {
  public abstract glOnInit(eventHub: GoldenLayout.EventEmitter, componentState: any): void;
}

/**
 * @whatItDoes Hook that is called after a component has been resized.
 */
export abstract class GlOnResize {
  public abstract glOnResize(): void;
}
