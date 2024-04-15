import React, { useEffect, useState } from 'react';
import '../styles/todo.scss';

export default function TodoListComponents() {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState({});
    const [currentDate, setCurrentDate] = useState(getFormattedDate(new Date()));

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todoList')) || {};
        setTodos(savedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(getFormattedDate(new Date()));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    function getFormattedDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function initializeTodosForDate(date) {
        const formattedDate = getFormattedDate(date);
        if (!todos[formattedDate]) {
            setTodos((prevTodos) => ({ ...prevTodos, [formattedDate]: [] }));
        }
    }

    const addTodo = (newTodo) => {
        initializeTodosForDate(new Date());
        const currentTodos = todos[currentDate] || [];
        if (currentTodos.length < 30) {
            setTodos((prevTodos) => ({ ...prevTodos, [currentDate]: [...currentTodos, newTodo] }));
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

    const onDelete = (id) => {
        setTodos((prevTodos) => ({
            ...prevTodos,
            [currentDate]: prevTodos[currentDate].filter((todoItem) => todoItem.id !== id),
        }));
    };

    const toggleCompleted = (id) => {
        setTodos((prevTodos) => ({
            ...prevTodos,
            [currentDate]: prevTodos[currentDate].map((todoItem) => {
                if (todoItem.id === id) {
                    return { ...todoItem, completed: !todoItem.completed };
                }
                return todoItem;
            }),
        }));
    };

    return (
        <div className="mb-todoList">
            <div className="todoList-title">Todo List for {currentDate}</div>
            <form className="input-todoList-box" onSubmit={onSubmit}>
                <input
                    className="input-todoList"
                    type="text"
                    value={todo}
                    onChange={onChange}
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
                                    onChange={() => toggleCompleted(todoItem.id)}
                                />
                                {todoItem.text}
                            </label>
                            <button className="todo-delete-btn" type="button" onClick={() => onDelete(todoItem.id)}>
                                <span className="todo-delete">
                                    <img src={process.env.PUBLIC_URL + '/icons/trash-2.svg'} alt="Trash Icon" />
                                </span>
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
