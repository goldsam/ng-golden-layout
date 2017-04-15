import { Component } from '@angular/core';

// let gettingStarted = require('html-loader!markdown-loader!../getting-started.md');

@Component({
  selector: 'demo-app',
  template: '<golden-layout-root></golden-layout-root>'
})
export class AppComponent {
  //public gettingStarted:string = gettingStarted;
  // public ngAfterContentInit(): any {
  //   setTimeout(()=>{
  //     if (typeof PR !== 'undefined') {
  //       // google code-prettify
  //       PR.prettyPrint();
  //     }
  //   }, 150);
  // }
}