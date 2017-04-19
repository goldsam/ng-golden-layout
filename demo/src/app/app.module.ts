import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { TestPanelComponent } from './test-panel.component';
import { 
  GoldenLayoutModule, 
  GoldenLayoutConfiguration, 
  DEFAULT_LOCAL_STORAGE_STATE_STORE_PROVIDER 
} from '@goldsam/ng-golden-layout';
import * as GoldenLayout from 'golden-layout';

const goldenLayoutConfig: GoldenLayoutConfiguration = {
  components: [
    {
      component: TestPanelComponent,
      componentName: 'test-panel'
    }
  ],
  defaultLayout: {
    content: [{
    type: 'row',
    content: [{
      type: 'component',
      title: 'A',
      componentName: 'test-panel',
      componentState: { label: 'A' }
    }, {
      type: 'stack',
      content: [{
        type: 'component',
        title: 'B', 
        componentName: 'test-panel',
        componentState: { label: 'B' }
      }, {
        type: 'component',
        title: 'C', 
        componentName: 'test-panel',
        componentState: { label: 'C' }
      }]
    }]
  }]
  }
}

@NgModule({
  declarations: [
    AppComponent,
    TestPanelComponent
  ],
  entryComponents: [
    TestPanelComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    GoldenLayoutModule.forRoot(goldenLayoutConfig)
  ],
  providers: [
    DEFAULT_LOCAL_STORAGE_STATE_STORE_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}