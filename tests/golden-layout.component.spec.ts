import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component, NgModule } from '@angular/core';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { GoldenLayoutConfiguration, GoldenLayoutService, GoldenLayoutComponent} from '../index';

@Component({
  template: '<div class="test-component">Test Component Content</div>'
})
class TestComponent {}

const config: GoldenLayoutConfiguration = {
  components: [
    {
      component: TestComponent,
      componentName: 'test-component'
    }
  ],
  defaultLayout: {
    content: [
      {
        type: 'component',
        componentName: 'test-component',
        componentState: { label: 'test' }
      }
    ]
  }
};

@NgModule({
  declarations: [
    TestComponent,
    GoldenLayoutComponent
  ],
  entryComponents: [
    TestComponent
  ],
  exports: [
    TestComponent,
    GoldenLayoutComponent
  ],
  providers: [
    GoldenLayoutService,
    { provide: GoldenLayoutConfiguration, useValue: config }
  ]
}) 
class ComponentModule {}


describe('GoldenLayoutComponent', () => {

  // let comp:    GoldenLayoutComponent;
  let fixture: ComponentFixture<GoldenLayoutComponent>;
  let service: GoldenLayoutService;
  // let de:      DebugElement;
  // let el:      HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ComponentModule
      ]
    });
    service = TestBed.get(GoldenLayoutService);

    spyOn(service, 'initialize');

    fixture = TestBed.createComponent(GoldenLayoutComponent);
    
    //comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    // de = fixture.debugElement.query(By.css('.test-component'));
    // el = de.nativeElement;
  });

  it('should intantiate its children.', async(() => {
    fixture.detectChanges();
    expect(service.initialize).toHaveBeenCalled();
    // expect(service.initialize).toHaveBeenCalled();
    
    // const x = fixture.debugElement.query(By.css('.test-component'));
    // expect(x.nativeElement.textContent).toContain('Test Component Content');
  }));

});
