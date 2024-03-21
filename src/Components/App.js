import { useState, useEffect } from "react";
import Form from "./Form/Form";
import Filter from "./Filter/Filter";
import Todos from "./Todos/Todos";
import './App.css';

export default function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [filter, setFilter] = useState("all");
  let allTodosCount = todos.length || 0;
  let doneTodosCount = todos.filter(todo => todo.done === true).length || 0;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    allTodosCount = todos.length;
    doneTodosCount = todos.filter(todo => todo.done === true).length;
  }, [todos, allTodosCount, doneTodosCount]);

  const clearTodos = () => {
    setTodos([]);
  }

  return (
    <div className="container">
      <h1 className="name">TodoList</h1>
      <Form 
        todos={todos}
        setTodos={setTodos}
      />
      <Filter
        allTodosCount={allTodosCount}
        doneTodosCount={doneTodosCount}
        setFilter={setFilter}
        filter={filter}
      />
      <button className="clear" onClick={clearTodos}>Clear all</button>
      <Todos 
        todos={todos} 
        setTodos={setTodos}
        filter={filter} 
      />
    </div>
  );
}
