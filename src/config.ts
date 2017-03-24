import { OpaqueToken, Type } from '@angular/core';
import * as GoldenLayout from 'golden-layout';

export interface IComponentConfiguration {
  /**
   * Name used to register compoent with GoldenLayout.
   */
  componentName: string;

  /**
   * Angular component type.
   */
  component: Type<any>;
}

export interface IGoldenLayoutConfiguration {
  /**
   * Array of component configurations.
   */
  components: IComponentConfiguration[];

  /**
   * Initial component layout configuration.
   */
  layout: GoldenLayout.Config;
}

export const GoldenLayoutConfiguration = new OpaqueToken('GoldenLayoutConfiguration');
