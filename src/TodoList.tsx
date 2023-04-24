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
      <div>Completed: {todoStore.status.completed}</div>
      <div>Remaining: {todoStore.status.remaining}</div>
      <ul>
        {todoStore.todos.map((todo) => (
          <li key={todo.id} onClick={() => todoStore.toggleTodo(todo.id)}>
            {todo.title} [{todo.completed ? "x" : ""}]
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
