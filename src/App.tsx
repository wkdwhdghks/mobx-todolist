import TodoList from "./TodoList";
import TodoStore from "./TodoStore";

function App() {
  const todoStore = new TodoStore();
  return (
    <div>
      <TodoList todoStore={todoStore} />
    </div>
  );
}

export default App;
