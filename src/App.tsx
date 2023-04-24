import TodoStore from "./TodoStore";
import TodoList from "./TodoList";

function App() {
  const todoStore = new TodoStore();

  return (
    <div>
      <TodoList todoStore={todoStore} />
    </div>
  );
}

export default App;
