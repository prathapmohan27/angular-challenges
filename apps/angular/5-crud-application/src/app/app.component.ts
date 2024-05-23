import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { TodoApiService } from './data-access/todo-api.service';
import { Task } from './model/task';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      <div>
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
      </div>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos: WritableSignal<Task[]> = signal([]);

  private _todoService = inject(TodoApiService);

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList() {
    this._todoService.getTodoList().subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  update(todo: Task) {
    this._todoService.update(todo).subscribe((todoUpdated: Task) => {
      this.todos.set(
        this.todos().map((todo) =>
          todo.id === todoUpdated.id ? todoUpdated : todo,
        ),
      );
    });
  }
}
