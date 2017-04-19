import * as GoldenLayout from 'golden-layout';

/**
 * @whatItDoes Hook invoked after a component has been resized.
 */
export abstract class GlOnResize {
  public abstract glOnResize(): void;
}

/**
 * @whatItDoes Hook invoked after a before a component's container is shown.
 */
export abstract class GlOnShow {
  public abstract glOnShow(): void;
}

/**
 * @whatItDoes Hook invoked after a before a component's container is hidden.
 */
export abstract class GlOnHide {
  public abstract glOnHide(): void;
}
