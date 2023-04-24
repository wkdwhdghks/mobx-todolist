import TodoStore from "./TodoStore";
import TodoList from "./TodoList";

function App() {
  const todoStore = new TodoStore();

  return <TodoList todoStore={todoStore} />;
}

export default App;
