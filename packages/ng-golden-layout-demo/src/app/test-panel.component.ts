import { Component, Inject } from '@angular/core';
import { GoldenLayoutComponentState, GlOnResize, GlOnHide, GlOnShow, GoldenLayoutContainer, FromParentContextObservable } from '@goldsam/ng-golden-layout';
import { TodoService, Todo } from './todo.service';
import * as GoldenLayout from 'golden-layout';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import '@goldsam/ng-golden-layout/dist/rxjs/add/operator/fromParentContext';

@Component({
  template: `
    <div>
      <h1>{{state?.label}}</h1>
      <input type="text" [value]="state?.value || ''" (input)="onInput($event)">
      <div *ngFor='let todo of todos | async'>
        {{todo.title}}
      </div>
    </div>
  `,
  selector: 'test-panel'
})
export class TestPanelComponent implements GlOnResize, GlOnHide, GlOnShow {

  private todos: Observable<Todo[]>;

  constructor(@Inject(GoldenLayoutComponentState) private state: any,
              @Inject(GoldenLayoutContainer) private container: GoldenLayout.Container,
              private todoService: TodoService) 
  {
    console.log("todoService.todos instanceof Observable = " + (todoService.todos instanceof Observable));
    this.todos = todoService.todos
      .fromParentContext()
      .switchMap(function(x) {
        return Observable.of(x);
      })
      .do(state => console.log(JSON.stringify(state)));
  }

  public onInput(e: Event): void {

    this.todoService.addTodo({
      title: 'walk the dog',
      notes: 'cool'
    });
    
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