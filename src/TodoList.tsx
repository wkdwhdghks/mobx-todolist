import { useState } from "react";
import TodoStore from "./TodoStore";
import { observer } from "mobx-react";

interface TodoListProps {
  todoStore: TodoStore;
}

const TodoList: React.FC<TodoListProps> = observer(({ todoStore }) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    todoStore.addTodo(value);
    setValue("");
  };

  return (
    <>
      <div>total: {todoStore.status.total}</div>
      <div>Completed: {todoStore.status.completed}</div>
      <div>Remaining: {todoStore.status.remaining}</div>
      <ul>
        {todoStore.todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              onChange={() => todoStore.toggleTodo(todo.id)}
            ></input>
            <label>{todo.title}</label>
            <button onClick={() => todoStore.deleteTodo(todo.id)}>x</button>
          </li>
        ))}
      </ul>

      <form>
        <input value={value} onChange={handleChange}></input>
        <button onClick={handleClick}>확인</button>
      </form>
    </>
  );
});

export default TodoList;
