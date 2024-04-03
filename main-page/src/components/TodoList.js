import React, { useEffect, useState } from 'react';

export default function TodoList() {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);

    const onChange = (event) => setTodo(event.target.value);
    const onSubmit = (event) => {
        event.preventDefault();
        if (todo === '') {
            return;
        }
        if (todos.length < 10) {
            setTodos((currentArray) => [todo, ...currentArray]);
        } else {
            return alert('등록된 리스트가 너무 많습니다.');
        }
        setTodo('');
    };

    const onClick = (idx) => {
        setTodos(todos.filter((_, todoIdx) => idx !== todoIdx));
    };

    useEffect(() => {
        const data = localStorage.getItem('todoList');
        if (data) {
            setTodos(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todos));
    }, [todos]);

    return (
        <div>
            <div>Todo List</div>
            <form onSubmit={onSubmit}>
                <input type="text" value={todo} onChange={onChange} maxLength={20} placeholder="할 일을 적으세요" />
                <button>
                    <span>add</span>
                </button>
            </form>
            <ul>
                {todos.map((item, idx) => (
                    <li key={idx}>
                        {item}
                        <button onClick={() => onClick(idx)}>
                            <span>delete</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
