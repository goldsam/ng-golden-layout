import {
  ComponentFactoryResolver,
  HostListener,
  ViewContainerRef,
  ElementRef,
  Component,
  OnInit,
  Type,
  Input,
  NgZone,
  OpaqueToken,
  Injector,
  ReflectiveInjector,
  ViewChild
} from '@angular/core';
import * as GoldenLayout from 'golden-layout';
import { GlOnResize, GlOnShow, GlOnHide, GlOnTab } from './hooks';
import { 
  GoldenLayoutService, 
  ComponentInitCallbackFactory, 
  ComponentInitCallback 
} from './golden-layout.service';

export const GoldenLayoutContainer = new OpaqueToken('GoldenLayoutContainer');
export const GoldenLayoutComponentState = new OpaqueToken('GoldenLayoutComponentState');

/**
 * Type guard which determines if a component implements the GlOnResize interface.
 */
function implementsGlOnResize(obj: any): obj is GlOnResize {
  return typeof obj === 'object' && typeof obj.glOnResize === 'function';
}

/**
 * Type guard which determines if a component implements the GlOnShow interface.
 */
function implementsGlOnShow(obj: any): obj is GlOnShow {
  return typeof obj === 'object' && typeof obj.glOnShow === 'function';
}

/**
 * Type guard which determines if a component implements the GlOnHide interface.
 */
function implementsGlOnHide(obj: any): obj is GlOnHide {
  return typeof obj === 'object' && typeof obj.glOnHide === 'function';
}

/**
 * Type guard which determines if a component implements the GlOnTab interface.
 */
function implementsGlOnTab(obj: any): obj is GlOnTab {
  return typeof obj === 'object' && typeof obj.glOnTab === 'function';
}

const COMPONENT_REF_KEY = '$componentRef';

@Component({
  selector: 'golden-layout-root',
  styles: [`
    .ng-golden-layout-root {
      width:100%;
      height:100%;
    }`
  ],
  template: `<div class="ng-golden-layout-root" #glroot></div>`
})
export class GoldenLayoutComponent implements OnInit, ComponentInitCallbackFactory {
  private goldenLayout: GoldenLayout;

  @ViewChild('glroot') private el: ElementRef;

  constructor(private glService: GoldenLayoutService,
              private viewContainer: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private ngZone: NgZone,
              private readonly injector: Injector) { }

  public ngOnInit(): void {
    this.glService.getState().then((layout: any) => {
      this._createLayout(layout);
    });
  }

  private _createLayout(layout: any): void {
    this.goldenLayout = new GoldenLayout(layout, $(this.el.nativeElement));

    // Destory child angular components on golden-layout container destruction.
    this.goldenLayout.eventHub.on('itemDestroyed', (item: any) => {
      const container = item.container;
      const component = container && container[COMPONENT_REF_KEY];
      if (component) {
        component.destroy();
        (container as any)[COMPONENT_REF_KEY] = null;
      }
    });

    // Register all golden-layout components.
    this.glService.initialize(this.goldenLayout, this);

    // Initialize the layout.
    this.goldenLayout.init();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    if (this.goldenLayout) {
      this.goldenLayout.updateSize();
    }
  }

  public createComponentInitCallback(componentType: Type<any>): ComponentInitCallback {
    return (container: GoldenLayout.Container, componentState: any) => {
      this.ngZone.run(() => {
        // Create an instance of the angular component.
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        const injector = this._createComponentInjector(container, componentState);
        const componentRef = this.viewContainer.createComponent(factory, undefined, injector);

        // Bind the new component to container's client DOM element.
        container.getElement().append($(componentRef.location.nativeElement));

        this._bindEventHooks(container, componentRef.instance);

        // Store a ref to the compoenentRef in the container to support destruction later on.
        (container as any)[COMPONENT_REF_KEY] = componentRef;
      });
    };
  }

  /**
   * Creates an injector capable of injecting the GoldenLayout object,
   * component container, and initial component state.
   */
  private _createComponentInjector(container: GoldenLayout.Container, componentState: any): Injector {
    return ReflectiveInjector.resolveAndCreate([
      {
        provide: GoldenLayoutContainer,
        useValue: container
      },
      {
        provide: GoldenLayoutComponentState,
        useValue: componentState
      },
      {
        provide: GoldenLayout,
        useValue: this.goldenLayout
      },
    ], this.injector);
  }

  /**
   * Registers an event handler for each implemented hook.
   * @param container Golden Layout component container.
   * @param component Angular component instance.
   */
  private _bindEventHooks(container: GoldenLayout.Container, component: any): void {
    if (implementsGlOnResize(component)) {
      container.on('resize', () => {
        component.glOnResize();
      });
    }

    if (implementsGlOnShow(component)) {
      container.on('show', () => {
        component.glOnShow();
      });
    }

    if (implementsGlOnHide(component)) {
      container.on('hide', () => {
        component.glOnHide();
      });
    }

    if (implementsGlOnTab(component)) {
      container.on('tab', () => {
        component.glOnTab();
      });
    }
  }
}
