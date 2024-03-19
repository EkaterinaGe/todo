import { useState, useEffect } from "react";
import Form from "./Form/Form";
import Filter from "./Filter/Filter";
import Todos from "./Todos/Todos";
import './App.css';

export default function App() {

  const [localTodos, setLocalTodos] = useState(JSON.parse(localStorage.getItem('todos')));
  const [completedTodos, setCompletedTodos] = useState(localTodos.filter(todo => todo.done === true));
  const [todos, setTodos] = useState(localTodos);
  const [allTodosCount, setAllTodosCount] = useState(localTodos.length);
  const [doneTodosCount, setDoneTodosCount] = useState(completedTodos.length);
  const [filter, setFilter] = useState("all");

  const readOnly = [
    {
       "id": "51c1c4f1-03bf-48bf-9705-9dc97ab61a76",
       "text": "delectus aut autem",
       "done": false,
       "read": true
    },
    {
       "id": "62aabce1-8f84-4684-90b9-2b2310cf726a",
       "text": "quis ut nam facilis et officia qui",
       "done": false,
       "read": true
    },
    {
       "id": "402ee516-6c72-4d16-a9a8-322069f5cf6e",
       "text": "fugiat veniam minus",
       "done": false,
       "read": true
    },
    {
       "id": "3b720eaf-163a-41c8-bc5e-b47f2370cd0c",
       "text": "et porro tempora",
       "done": true,
       "read": true
    },
    {
       "id": "3ab57b63-e789-4211-a507-6b89501bc39a",
       "text": "laboriosam mollitia et enim quasi adipisci quia provident illum",
       "done": false,
       "read": true
    },
    {
       "id": "09d15f18-14ea-4fd3-b75b-e57777c25b3c",
       "text": "qui ullam ratione quibusdam voluptatem quia omnis",
       "done": false,
       "read": true
    },
    {
       "id": "46f5bdd5-dc22-441e-b78b-e812d817cfde",
       "text": "illo expedita consequatur quia in",
       "done": false,
       "read": true
    },
    {
       "id": "bce9f1e0-4383-40a6-9a10-2f59d9aa1465",
       "text": "quo adipisci enim quam ut ab",
       "done": true,
       "read": true
    },
    {
       "id": "05da3453-89e2-4d44-8912-5b727218808c",
       "text": "molestiae perspiciatis ipsa",
       "done": false,
       "read": true
    },
    {
       "id": "c7034df3-eb7b-4cad-a323-3f5c6ceb9283",
       "text": "illo est ratione doloremque quia maiores aut",
       "done": true,
       "read": true
    }
  ]
  let isRead = false;
  todos.forEach( function(todo) {
    if (todo.read) isRead = true;
    return isRead;
  })
  if (!isRead) {
    setTodos(todos.concat(readOnly));
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    setLocalTodos(todos);
    setCompletedTodos(todos.filter(todo => todo.done === true));
    setAllTodosCount(todos.length);
    setDoneTodosCount(completedTodos.length);
  }, [todos, completedTodos]);

  const clearTodos = () => {
    setTodos(todos.filter(todo => todo.read === true));
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
