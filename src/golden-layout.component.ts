import {
  ComponentFactoryResolver,
  HostListener,
  ViewContainerRef,
  ElementRef,
  Component,
  OnInit,
  Type,
  Input,
  NgZone
} from '@angular/core';
import * as GoldenLayout from 'golden-layout';
import $ from 'jquery';
import { GlOnInit, GlOnResize } from './hooks';
import { GoldenLayoutService, IComponentInitCallbackFactory, IComponentInitCallback } from './golden-layout.service';

function isGlOnInit(obj: any): obj is GlOnInit {
  return typeof obj === 'object' && typeof obj.glOnInit === 'function';
}

function isGlOnResize(obj: any): obj is GlOnResize {
  return typeof obj === 'object' && obj && typeof obj.glOnResize === 'function';
}

const COMPONENT_REF_KEY = '$componentRef';

@Component({
  selector: 'golden-layout-root',
  template: `<div class="golden-layout-root" style="width:100%;height:100%;"></div>`,
})
export class GoldenLayoutComponent implements OnInit, IComponentInitCallbackFactory {
  private goldenLayout: GoldenLayout;

  constructor(private glService: GoldenLayoutService,
              private el: ElementRef,
              private viewContainer: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private ngZone: NgZone) {}

  public ngOnInit(): void {
    this.goldenLayout = new GoldenLayout(
      this.glService.config.layout,
      $(this.el.nativeElement).find('.golden-layout-root'));

    // Register an event handler to destory the angular component on container destruction.
    this.goldenLayout.eventHub.on('itemDestroyed', (item: any) => {
      const container = item.container;
      const component = container && container[COMPONENT_REF_KEY];
      if (component) {
        component.destroy();
      }
    });

    // Register all golden-layout components.
    this.glService.registerComponents(this.goldenLayout, this);

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

        // Create an instance of the angular component.
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        const componentRef = this.viewContainer.createComponent(factory);
        const component = componentRef.instance;

        // If the coponent implements Dockable, then initialize it.
        if (isGlOnInit(component)) {
          component.glOnInit(this.goldenLayout.eventHub, componentState);
        }

        // Bind the new component to container's client DOM element.
        container.getElement().append($(componentRef.location.nativeElement));

        // Register an event hanlder to proxy the resize event.
        container.on('resize', (item: any) => {
          if (isGlOnResize(component)) {
            component.glOnResize();
          }
        });

        // Store a ref to the compoenentRef in the container to support destruction later on.
        (container as any)[COMPONENT_REF_KEY] = componentRef;
      });
    };
  }
}
