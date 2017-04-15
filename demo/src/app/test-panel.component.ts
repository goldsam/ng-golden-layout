import { Component, Inject } from '@angular/core';
import { GoldenLayoutContainer } from '@goldsam/ng-golden-layout';
import * as GoldenLayout from 'golden-layout';

@Component({
  template: '<div>Yay</div>',
  selector: 'test-panel'
})
export class TestPanelComponent {
  constructor(@Inject(GoldenLayoutContainer) private readonly glContainer: GoldenLayout.Container) {
    const x = 1;
    console.log(`${x + 1}`);
  }
}