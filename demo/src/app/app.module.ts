import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { TestPanelComponent } from './test-panel.component';
import { GoldenLayoutModule, IGoldenLayoutConfiguration } from '@goldsam/ng-golden-layout';
import * as GoldenLayout from 'golden-layout';

const goldenLayoutConfig: IGoldenLayoutConfiguration = {
  components: [
    {
      component: TestPanelComponent,
      componentName: 'test-panel'
    }
  ],
  layout: {
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


// // const configGoldenLayout.Config = [

// // ]

// GoldenLayoutModule.forRoot

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
  bootstrap: [AppComponent]
})
export class AppModule {
}