import React, { useEffect, useState } from 'react';

import '../styles/todoList.scss';

export default function TodoList() {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todoList')) || {});

    const currentDate = getFormattedDate(new Date());

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (newTodo) => {
        const currentTodos = todos[currentDate] || [];
        if (currentTodos.length < 10) {
            setTodos((prevTodos) => ({
                ...prevTodos,
                [currentDate]: [...currentTodos, newTodo],
            }));
        } else {
            alert('등록된 리스트가 너무 많습니다.');
        }
    };

    const onChange = (event) => setTodo(event.target.value);

    const onSubmit = (event) => {
        event.preventDefault();
        if (todo === '') {
            return;
        }
        const newTodo = {
            id: Date.now(),
            text: todo,
            completed: false,
        };

        addTodo(newTodo);
        setTodo('');
    };

    const onDelete = (date, id) => {
        setTodos((prevTodos) => ({
            ...prevTodos,
            [date]: prevTodos[date].filter((todoItem) => todoItem.id !== id),
        }));
    };

    const toggleCompleted = (date, id) => {
        setTodos((prevTodos) => ({
            ...prevTodos,
            [date]: prevTodos[date].map((todoItem) => {
                if (todoItem.id === id) {
                    return { ...todoItem, completed: !todoItem.completed };
                }
                return todoItem;
            }),
        }));
    };

    return (
        <div className="mb-todoList">
            <div className="todoList-title">Todo List</div>
            <form className="input-todoList-box" onSubmit={onSubmit}>
                <input
                    className="input-todoList"
                    type="text"
                    value={todo}
                    onChange={onChange}
                    maxLength={20}
                    placeholder="할 일을 적으세요"
                />
                <button className="todoList-btn" type="submit">
                    <span className="todoList-add">+</span>
                </button>
            </form>
            <ul className="mb-list">
                {todos[currentDate] &&
                    todos[currentDate].map((todoItem) => (
                        <li className={`todoList ${todoItem.completed ? 'completed' : ''}`} key={todoItem.id}>
                            <label className="todoList-label">
                                <input
                                    className="todo-check"
                                    type="checkbox"
                                    checked={todoItem.completed}
                                    onChange={() => toggleCompleted(currentDate, todoItem.id)}
                                />
                                {todoItem.text}
                            </label>
                            <button
                                className="todo-delete-btn"
                                type="button"
                                onClick={() => onDelete(currentDate, todoItem.id)}
                            >
                                <span className="todo-delete">
                                    <img
                                        className="trash-icon"
                                        src={process.env.PUBLIC_URL + '/icons/trash-2.svg'}
                                        alt="Trash Icon"
                                    />
                                </span>
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
