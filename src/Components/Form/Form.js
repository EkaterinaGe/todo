import './Form.css';
import {useState, useEffect} from 'react';
import { v4 as uuidv4 } from "uuid";

export default function Form({todos, setTodos, allTodosCount, setAllTodosCount}) {
    const [value, setValue] = useState('');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    })

    const addTodo = (value) => {
        if (value.trim()) {
            setTodos([...todos, {id: uuidv4(), text: value, done: false, read: false}]);
            setAllTodosCount(allTodosCount + 1)
        } else {
            alert('Input text!')
        }
    }

    return (
        <form onSubmit={e => {
            e.preventDefault();
            addTodo(value);
            setValue('');
        }}>
            <input 
                type='text' 
                placeholder='New todo...' 
                className='input'
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <button className='add' type='submit'>Add</button>
        </form>
    )
}