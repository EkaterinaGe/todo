import { useState } from "react";
import Form from "./Form/Form";
import Filter from "./Filter/Filter";
import Todos from "./Todos/Todos";
import './App.css';

export default function App() {
  const localTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const completedTodos = localTodos.filter(todo => todo.done === true);
  const [todos, setTodos] = useState(localTodos || []);
  const [allTodosCount, setAllTodosCount] = useState(localTodos.length || 0);
  const [doneTodosCount, setDoneTodosCount] = useState(completedTodos.length || 0);
  const [filter, setFilter] = useState("all");

  const clearTodos = () => {
    setTodos([]);
    setAllTodosCount(0);
    setDoneTodosCount(0)
  }

  return (
    <div className="container">
      <h1 className="name">TodoList</h1>
      <Form 
        todos={todos}
        setTodos={setTodos}
        allTodosCount={allTodosCount}
        setAllTodosCount={setAllTodosCount}
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
        doneTodosCount={doneTodosCount} 
        setDoneTodosCount={setDoneTodosCount} 
        allTodosCount={allTodosCount}
        setAllTodosCount={setAllTodosCount}
      />
    </div>
  );
}
