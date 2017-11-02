
import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import * as GoldenLayout from 'golden-layout';
import { GoldenLayoutConfiguration, GoldenLayoutService} from '../index';

@Component({
  selector: 'golden-layout-test-component'
})
class TestComponent {
}

describe('GoldenLayoutService', () => {

  const config: GoldenLayoutConfiguration = {
    components: [
      {
        component: TestComponent,
        componentName: 'test-component'
      }
    ],
    defaultLayout: {
      content: [{
        type: 'component',
        componentName: 'test-component',
        componentState: { label: 'test' }
      }]
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GoldenLayoutService,
        {provide : GoldenLayoutConfiguration, useValue : config}
      ]
    });
  });

  it('registering all configured components with a GoldenLayout instance.',
    inject([GoldenLayoutService],
      (goldenLayoutService: GoldenLayoutService) => {
        // const goldenLayout = new GoldenLayout();
        // goldenLayoutService.registerComponents()
      })
  );

});
