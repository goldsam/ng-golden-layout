import { Inject, Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as GoldenLayout from 'golden-layout';
import { IGoldenLayoutConfiguration, IComponentConfiguration, GoldenLayoutConfiguration } from './config';

/**
 * golden-layout component initialization callback type.
 */
export interface IComponentInitCallback extends Function {
  (container: GoldenLayout.Container, componentState: any): void;
}

export interface IComponentInitCallbackFactory {
  createComponentInitCallback(component: Type<any>): IComponentInitCallback;
}

@Injectable()
export class GoldenLayoutService {
  constructor(@Inject(GoldenLayoutConfiguration) public readonly config: IGoldenLayoutConfiguration) {}

  public registerComponents(goldenLayout: GoldenLayout, componentInitCallbackFactory: IComponentInitCallbackFactory) {
    this.config.components.forEach((componentConfig: IComponentConfiguration) => {
      const componentInitCallback = componentInitCallbackFactory.createComponentInitCallback(componentConfig.component);
      goldenLayout.registerComponent(componentConfig.componentName, componentInitCallback);
    });
  }
}
