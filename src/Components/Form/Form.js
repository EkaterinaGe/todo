import './Form.css';
import {useState} from 'react';
import { v4 as uuidv4 } from "uuid";

export default function Form({todos, setTodos}) {
    const [value, setValue] = useState('');

    const addTodo = (value) => {
        if (value.trim()) {
            setTodos([...todos, {id: uuidv4(), text: value, done: false}]);
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