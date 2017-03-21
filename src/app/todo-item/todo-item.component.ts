import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo: Todo;

  constructor(private api: TodoService ) { }

  updateTodo() {
    this.api.updateTodo(this.todo).subscribe(res => {
      // success, response would be the updated field and id
      this.todo.done = res.done;
      console.log(this.todo);
    }, err => {
      // error , should return some message, right?
    });
  }
}
