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
      deleteTodo: action,
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

  deleteTodo(id: string) {
    this.todos = this.todos.filter((item) => item.id !== id);
  }

  toggleTodo(id: string) {
    const index = this.todos.findIndex((item) => item.id === id);
    if (index > -1) {
      this.todos[index].completed = !this.todos[index].completed;
    }
  }

  get status() {
    let total = this.todos.length;
    let completed = this.todos.filter((todo) => todo.completed).length;
    let remaining = this.todos.filter((todo) => !todo.completed).length;
    return { total, completed, remaining };
  }
}
