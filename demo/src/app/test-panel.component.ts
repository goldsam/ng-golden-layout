import { Component, Inject } from '@angular/core';
import { GoldenLayoutComponentState, GlOnResize, GlOnHide, GlOnShow, GlOnTab, GoldenLayoutContainer } from '@goldsam/ng-golden-layout';
import * as GoldenLayout from 'golden-layout';

@Component({
  template: `
    <div>
      <h1>{{state?.label}}</h1>
      <input type="text" [value]="state?.value || ''" (input)="onInput($event)">
    </div>
  `,
  selector: 'test-panel'
})
export class TestPanelComponent implements GlOnResize, GlOnHide, GlOnShow, GlOnTab {

  constructor(@Inject(GoldenLayoutComponentState) private state: any,
              @Inject(GoldenLayoutContainer) private container: GoldenLayout.Container) {}

  public onInput(e: Event): void {
    
    this.container.extendState({
      value: (<HTMLInputElement>e.target).value
    });

    console.log('state saved.');
  }

  public glOnResize(): void {
    console.log('Resizing!');
  }

  public glOnShow(): void {
    console.log('Showing!');
  }

  public glOnHide(): void {
    console.log('Hiding!');
  }

  public glOnTab(): void {
    console.log('Tab shown!');
  }
}
