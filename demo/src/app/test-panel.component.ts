import { Component, Inject } from '@angular/core';
import { GoldenLayoutComponentState, GlOnResize, GlOnHide, GlOnShow, GoldenLayoutContainer } from '@goldsam/ng-golden-layout';
import { TodoService, Todo } from './todo.service';
import * as GoldenLayout from 'golden-layout';

import { Observable } from 'rxjs/Observable';
import '@goldsam/ng-golden-layout/rxjs/add/operator/fromParentContext';


@Component({
  template: `
    <div>
      <h1>{{state?.label}}</h1>
      <input type="text" [value]="state?.value || ''" (input)="onInput($event)">
    </div>
  `,
  selector: 'test-panel'
})
export class TestPanelComponent implements GlOnResize, GlOnHide, GlOnShow {

  private todos: Observable<Todo[]>;

  constructor(@Inject(GoldenLayoutComponentState) private state: any,
              @Inject(GoldenLayoutContainer) private container: GoldenLayout.Container,
              todoService: TodoService) 
  {
    this.todos = todoService.todos
      .fromParentContext();
  }

  public onInput(e: Event): void {
    
    // this.container.extendState({
    //   value: (<HTMLInputElement>e.target).value
    // });

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
}