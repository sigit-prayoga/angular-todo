import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';
import { Todo } from './todo';

@Injectable()
export class TodoService {

  constructor(private http: Http) { }

  getAll(): Observable<Todo[]> {
    return this.http.get(environment.api.getPath('/todos'), {
      headers: this.getHeaders()
    })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error) || 'server error');
  }

  addTodo(title: string): Observable<Todo> {
    return this.http.post(environment.api.getPath('/todos'), {
      headers: this.getHeaders(),
      title: title
    })
      .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json().error) || 'server error');
  }

  updateTodo(todo: Todo): Observable<Todo> {
    // just switch done status
    todo.done = !todo.done;
    return this.http.put(environment.api.getPath('/todos'), {
      title: todo.todo,
      done: todo.done,
      todo: todo.id
    })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error) || 'server error');
  }

  getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
