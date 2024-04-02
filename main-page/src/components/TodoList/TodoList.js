import React, { useState } from 'react';

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [NewTodo, setNewTodo] = useState('');

    const onChange = (event) => {
        setNewTodo(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (NewTodo === '') {
            return;
        } else {
            setTodos((current) => [...current, NewTodo]);
            setNewTodo('');
        }
    };
    const onDelete = (index) => {
        setTodos(todos.filter((item, todoindex) => index !== todoindex));
    };

    return (
        <div>
            <div>Todo List</div>
            {todos.map((element, index) => {
                return (
                    <li key={index}>
                        {element}
                        <button onClick={() => onDelete(index)}>삭제</button>
                    </li>
                );
            })}
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="입력" value={NewTodo} onChange={onChange} />
                <button>Add</button>
            </form>
        </div>
    );
}
