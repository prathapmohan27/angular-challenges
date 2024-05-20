import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  private http = inject(HttpClient);

  getTodoList() {
    return this.http.get<Task[]>('https://jsonplaceholder.typicode.com/todos');
  }

  update(todo: Task) {
    return this.http.put<Task>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      JSON.stringify({
        todo: todo.id,
        title: randText(),
        body: todo.body,
        userId: todo.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }
}
