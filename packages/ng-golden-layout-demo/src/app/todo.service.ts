import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject'
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/scan';
import 'rxjs/add/observable/merge';

export interface Todo {
  id?: number,
  title: string,
  notes: string,
  checked?: boolean,
}

interface TodosState {
  todos: Todo[];
  nextId: number;
}

interface TodosStateOperation extends Function {
  (state: TodosState): TodosState;
};

export class TodoService {

  private readonly _newTodo = new Subject<Todo>();
  private readonly _deleteTodo = new Subject<number>();
  
  private readonly _state = new ReplaySubject<TodosState>();
  
  public readonly todos: Observable<Todo[]>;
  
  constructor() {

    const newTodoOperation = this._newTodo
      .map((todo) => {
        return (state: TodosState): TodosState => {
          return {
            todos: state.todos.concat(Object.assign({}, todo, {
              id: state.nextId
            })),
            nextId: state.nextId + 1
          };
        };
      });

    const deleteTodoOperation = this._deleteTodo
      .map(id => {
        return (state: TodosState): TodosState => {
          return {
            todos: state.todos.filter(x => x.id !== id), 
            nextId: state.nextId
          }
        }
      });

    Observable.merge(newTodoOperation, deleteTodoOperation)
      .scan((state: TodosState, op: TodosStateOperation): TodosState => {
          return op(state);
        }, {
          todos: [],
          nextId: 1
        })
      .subscribe(this._state);

      this.todos = this._state
        .pluck('todos');

  }

  public addTodo(todo: Todo):void {
    this._newTodo.next(todo);
  }

  public deleteTodo(id: number): void {
    this._deleteTodo.next(id);
  }
}