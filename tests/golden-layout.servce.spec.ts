
import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import * as GoldenLayout from 'golden-layout';
import { IGoldenLayoutConfiguration, GoldenLayoutService, GoldenLayoutConfiguration} from '../index';

@Component({
  selector: 'golden-layout-test-component'
})
class TestComponent {
}

describe('GoldenLayoutService', () => {

  const config: IGoldenLayoutConfiguration = {
    components: [
      {
        component: TestComponent,
        componentName: 'test-component'
      }
    ],
    layout: {
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
