import { makeObservable, observable, action, computed } from "mobx";
import { v4 as uuid } from "uuid";

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

export default class TodoStore {
  todos: TodoItem[] = [];

  constructor() {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      toggleTodo: action,
      status: computed,
    });
  }

  addTodo(title: string) {
    const item: TodoItem = {
      id: uuid(),
      title,
      completed: false,
    };
    this.todos.push(item);
  }

  toggleTodo(id: string) {
    const index = this.todos.findIndex((item) => item.id === id);
    if (index > -1) {
      this.todos[index].completed = !this.todos[index].completed;
    }
  }

  get status() {
    let completed = 0,
      remaining = 0;
    this.todos.forEach((todo) => {
      if (todo.completed) {
        completed++;
      } else {
        remaining++;
      }
    });
    return { completed, remaining };
  }
}
