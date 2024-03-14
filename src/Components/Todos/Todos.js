import './Todos.css';
import {useState} from 'react';

export default function Todos({ todos, setTodos, filter, doneTodosCount, setDoneTodosCount, allTodosCount, setAllTodosCount }) {
    const [isEdit, setIsEdit] = useState("");
    const [value, setValue] = useState("");

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id !== id) return todo;
            if (todo.done) {
                setDoneTodosCount(doneTodosCount - 1)
            } else {
                setDoneTodosCount(doneTodosCount + 1)
            }
            return {
                ...todo,
                done: !todo.done
            }
        }))
    }
    
    const editTodo = (id, value) => {
        setTodos(todos.map(todo => {
            if (todo.id !== id) return todo;
            if (todo.done) {
                setDoneTodosCount(doneTodosCount - 1)
            }
            return {
                ...todo,
                done: false,
                text: value
            }
        }))
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
        todos.forEach(todo => {
            if (todo.id === id) {
                if (todo.done) setDoneTodosCount(doneTodosCount - 1)
            }
        })
        setAllTodosCount(allTodosCount - 1);
    }

    return (
        <ul className="todos">
            {todos.filter(todo => {
                if (filter === "all") return true;
                if (filter === "completed") return todo.done;
                if (filter === "active") return !todo.done;
                return true;
            }).map(todo => {
                return (
                    <li 
                        className={todo.done ? "todo done" : "todo"} 
                        key={todo.id} 
                        >
                            {isEdit === todo.id ? (
                                <form 
                                    className="todo__text"
                                    onSubmit={e => {
                                        setIsEdit("");
                                        editTodo(todo.id, value);
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
                                            editTodo(todo.id, value);
                                            setIsEdit("");
                                            setValue("");
                                        }}
                                        />
                                        <img 
                                        src={process.env.PUBLIC_URL + "/Img/cross.svg"}
                                        alt="Cancel" 
                                        onClick={e => {
                                            setIsEdit("");
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
                                            onClick={() => toggleTodo(todo.id)}
                                            checked={todo.done}
                                            />
                                        {todo.text}
                                    </div>
                                    <div className="control">
                                        <img 
                                        src={process.env.PUBLIC_URL + "/Img/edit.svg"}
                                        alt="Edit" 
                                        onClick={e => {
                                            setIsEdit(todo.id)
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