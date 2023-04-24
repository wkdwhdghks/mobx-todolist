import { useState } from "react";
import TodoStore from "./TodoStore";
import { observer } from "mobx-react";
import { FaTrashAlt } from "react-icons/fa";
import style from "./TodoList.module.css";

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
    if (value.length > 0) {
      todoStore.addTodo(value);
      setValue("");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.status}>
        <div>total: {todoStore.status.total}</div>
        <div>Completed: {todoStore.status.completed}</div>
        <div>Remaining: {todoStore.status.remaining}</div>
      </div>

      <form className={style.form}>
        <input
          value={value}
          placeholder="Add Todo..."
          onChange={handleChange}
          className={style.input}
        ></input>
        <button onClick={handleClick} className={style.button}>
          Submit
        </button>
      </form>

      <ul className={style.ul}>
        {todoStore.todos.map((todo) => (
          <li key={todo.id} className={style.li}>
            <input
              type="checkbox"
              onChange={() => todoStore.toggleTodo(todo.id)}
              className={style.input}
            ></input>
            <label className={style.label}>{todo.title}</label>
            <div
              className={style.div}
              onClick={() => todoStore.deleteTodo(todo.id)}
            >
              <p className={style.p}>
                <FaTrashAlt />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default TodoList;
