import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [TodoService],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: Todo[];
  errorMsg: string;
  newTodo: string;

  constructor(private api: TodoService) { }

  ngOnInit() {
    // get all todos when loads
    this.api.getAll().subscribe(res => {
      console.log(res);
      this.todos = res;
    }, err => {
      this.errorMsg = err;
    });
  }

  addTodo() {
    console.log(this.newTodo);
    if (this.newTodo.length > 0) {
      this.api.addTodo(this.newTodo).subscribe(res => {
        this.todos.push(res);
      });
    }
  }
}
