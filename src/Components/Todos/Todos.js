import './Todos.css';
import {useState} from 'react';

export default function Todos({ todos, setTodos, filter }) {
    const [editedTodoId, setEditedTodoId] = useState("");
    const [value, setValue] = useState("");

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id !== id) return todo;
            return {
                ...todo,
                done: !todo.done
            }
        }))
    }
    
    const editTodo = (id, value) => {
        setTodos(todos.map(todo => {
            if (todo.id !== id) return todo;
            return {
                ...todo,
                done: false,
                text: value
            }
        }))
        setValue("");
        setEditedTodoId("");
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    return (
        <ul className="todos">
            {todos.filter(todo => {
                if (filter === "all") return true;
                if (filter === "completed") return todo.done;
                if (filter === "active") return !todo.done;
                return true;
            }).reverse().map(todo => {
                return (
                    <li 
                        className={todo.done ? "todo done" : "todo"} 
                        key={todo.id} 
                        >
                            {editedTodoId === todo.id ? (
                                <form 
                                    className="todo__text"
                                    onSubmit={e => {
                                        if (value === "") {
                                            alert("Input text!")
                                        } else {
                                            editTodo(todo.id, value)
                                        }
                                    }}
                                >
                                    <input 
                                        type="text"
                                        placeholder={todo.text}
                                        className="edit"
                                        value={value}
                                        onChange={e => setValue(e.target.value)}
                                    />
                                    <div className="control">
                                        <img 
                                        src={process.env.PUBLIC_URL + "/Img/done.svg"}
                                        alt="Save" 
                                        onClick={e => {
                                            if (value === "") {
                                                alert("Input text!")
                                            } else {
                                                editTodo(todo.id, value)
                                            }
                                        }}
                                        />
                                        <img 
                                        src={process.env.PUBLIC_URL + "/Img/cross.svg"}
                                        alt="Cancel" 
                                        onClick={e => {
                                            setEditedTodoId("");
                                            setValue("");
                                        }}
                                        />
                                    </div>
                                </form>
                            ) : (
                                <div className="todo__text">
                                    <div className="todo__text__check">
                                        <input 
                                            type="checkbox" 
                                            onClick={() => {
                                                toggleTodo(todo.id);
                                            }}
                                            checked={todo.done}
                                            />
                                        {todo.text}
                                    </div>
                                    <div className="control">
                                        <img 
                                        src={process.env.PUBLIC_URL + "/Img/edit.svg"}
                                        alt="Edit" 
                                        onClick={e => {
                                            setEditedTodoId(todo.id)
                                        }}
                                        />
                                        <img 
                                        src={process.env.PUBLIC_URL + "/Img/delete.svg"}
                                        alt="Delete" 
                                        onClick={e => {
                                            deleteTodo(todo.id)
                                        }}
                                        />
                                    </div>
                                </div>
                            )}
                    </li>
                )
            })}
        </ul>
    )
}