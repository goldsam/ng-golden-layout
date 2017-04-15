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
import { GlOnInit, GlOnResize } from './hooks';
import { GoldenLayoutService, IComponentInitCallbackFactory, IComponentInitCallback } from './golden-layout.service';

export const GoldenLayoutContainer = new OpaqueToken('GoldenLayoutContainer');

/**
 * Helper function to determine a component implements the GlOnInit interface.
 */
function implementsGlOnInit(obj: any): obj is GlOnInit {
  return typeof obj === 'object' && typeof obj.glOnInit === 'function';
}

/**
 * Helper function to determine a component implements the GlOnResize interface.
 */
function implementsGlOnResize(obj: any): obj is GlOnResize {
  return typeof obj === 'object' && obj && typeof obj.glOnResize === 'function';
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
export class GoldenLayoutComponent implements OnInit, IComponentInitCallbackFactory {
  private goldenLayout: GoldenLayout;

  @ViewChild('glroot') private el: ElementRef;

  constructor(private glService: GoldenLayoutService,
              private viewContainer: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private ngZone: NgZone,
              private readonly injector: Injector) {}

  public ngOnInit(): void {
    this.goldenLayout = new GoldenLayout(this.glService.config.layout, $(this.el.nativeElement));

    // Destory child angular components on golden-layout container destruction.
    this.goldenLayout.eventHub.on('itemDestroyed', (item: any) => {
      const container = item.container;
      const component = container && container[COMPONENT_REF_KEY];
      if (component) {
        component.destroy();
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

  public createComponentInitCallback(componentType: Type<any>): IComponentInitCallback {
    return (container: GoldenLayout.Container, componentState: any) => {
      this.ngZone.run(() => {

        // Create an injector capable of injecting the GL container into components.
        const injector = ReflectiveInjector.resolveAndCreate([
          {
            provide: GoldenLayoutContainer,
            useValue: container
          }
        ], this.injector);

        // Create an instance of the angular component.
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        const componentRef = this.viewContainer.createComponent(factory, undefined, injector);
        const component = componentRef.instance;

        // Allow the component to handle initialization if it implements GlOnInit.
        if (implementsGlOnInit(component)) {
          component.glOnInit(this.goldenLayout.eventHub, componentState);
        }

        // Bind the new component to container's client DOM element.
        container.getElement().append($(componentRef.location.nativeElement));

        // Register an event hanlder to proxy the resize event.
        container.on('resize', (item: any) => {
          if (implementsGlOnResize(component)) {
            component.glOnResize();
          }
        });

        // Store a ref to the compoenentRef in the container to support destruction later on.
        (container as any)[COMPONENT_REF_KEY] = componentRef;
      });
    };
  }
}
