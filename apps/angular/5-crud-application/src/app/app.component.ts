import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TodoApiService } from './data-access/todo-api.service';
import { Task } from './model/task';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos!: Task[];

  private todoService = inject(TodoApiService);

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList() {
    this.todoService.getTodoList().subscribe((todos) => {
      this.todos = todos;
    });
  }

  update(todo: Task) {
    this.todoService.update(todo).subscribe((todoUpdated: Task) => {
      this.todos[todoUpdated.id - 1] = todoUpdated;
    });
  }
}
