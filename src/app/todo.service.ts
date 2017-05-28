import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';
import { Todo } from './todo';

@Injectable()
export class TodoService {

  constructor(private http: Http) { }

  createTodo(title: string): Todo {
    // default value except the title
    return new Todo(title, false, null);
  }

  getAll(): Observable<Todo[]> {
    const options = this.putBasicHeaders();
    return this.http.get(environment.api.getPath('/todos'), options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error) || 'server error');
  }

  addTodo(title: string): Observable<Todo> {
    const options = this.putBasicHeaders();
    return this.http.post(environment.api.getPath('/todos'), {
      todo: title
    }, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error) || 'server error');
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const options = this.putBasicHeaders();
    // just switch done status
    todo.done = !todo.done;
    return this.http.put(environment.api.getPath('/todos'), {
      todo: todo.todo,
      done: todo.done,
      id: todo.id
    }, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error) || 'server error');
  }

  private putBasicHeaders() {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return new RequestOptions({
      headers: headers
    });
  };
}
