import React, { useEffect, useState } from 'react';

import '../styles/todo.scss';

export default function TodoListComponents() {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState({});
    const [currentDate, setCurrentDate] = useState(getFormattedDate(new Date()));
    const [selectedDate, setSelectedDate] = useState('');
    const [editedTodoId, setEditedTodoId] = useState(null);
    const [editedTodoText, setEditedTodoText] = useState('');

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todoList')) || {};
        setTodos(savedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentDateObject = new Date();
            setCurrentDate(getFormattedDate(currentDateObject));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const initialize = () => {
            initializeTodosForDate(selectedDate || currentDate);
        };
        initialize();
    }, [selectedDate, currentDate]); // eslint-disable-line react-hooks/exhaustive-deps

    function getFormattedDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function initializeTodosForDate(date) {
        if (!(date instanceof Date)) {
            date = new Date();
        }
        const formattedDate = getFormattedDate(date);
        if (!todos[formattedDate]) {
            setTodos((prevTodos) => ({ ...prevTodos, [formattedDate]: [] }));
        }
    }

    const addTodo = (newTodo) => {
        initializeTodosForDate(selectedDate || new Date());
        const currentTodos = todos[selectedDate || currentDate] || [];
        if (currentTodos.length < 30) {
            setTodos((prevTodos) => ({ ...prevTodos, [selectedDate || currentDate]: [...currentTodos, newTodo] }));
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

    const goToPreviousDate = () => {
        const previousDate = new Date(selectedDate || currentDate);
        previousDate.setDate(previousDate.getDate() - 1);
        setSelectedDate(getFormattedDate(previousDate));
    };

    const goToNextDate = () => {
        const nextDate = new Date(selectedDate || currentDate);
        nextDate.setDate(nextDate.getDate() + 1);
        setSelectedDate(getFormattedDate(nextDate));
    };

    const toggleCompleted = (id) => {
        setTodos((prevTodos) => ({
            ...prevTodos,
            [selectedDate || currentDate]: prevTodos[selectedDate || currentDate].map((todoItem) => {
                if (todoItem.id === id) {
                    return { ...todoItem, completed: !todoItem.completed };
                }
                return todoItem;
            }),
        }));
    };

    const onDelete = (id) => {
        setTodos((prevTodos) => ({
            ...prevTodos,
            [selectedDate || currentDate]: prevTodos[selectedDate || currentDate].filter(
                (todoItem) => todoItem.id !== id
            ),
        }));
    };

    const onEdit = (id, text) => {
        setEditedTodoId(id);
        setEditedTodoText(text);
    };

    const onSaveEdit = () => {
        setTodos((prevTodos) => ({
            ...prevTodos,
            [selectedDate || currentDate]: prevTodos[selectedDate || currentDate].map((todoItem) => {
                if (todoItem.id === editedTodoId) {
                    return { ...todoItem, text: editedTodoText };
                }
                return todoItem;
            }),
        }));
        setEditedTodoId(null);
        setEditedTodoText('');
    };

    return (
        <div>
            <div className="todoList-nav">
                <button className="todoList-nav-btn" onClick={goToPreviousDate}>
                    &#60;
                </button>
                <span className="todoList-date">{selectedDate || currentDate}</span>
                <button className="todoList-nav-btn" onClick={goToNextDate}>
                    &#62;
                </button>
            </div>
            <div className="mb-todoList-page">
                <div className="todoList-title">Todo List</div>
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
                    {(selectedDate || currentDate) &&
                        todos[selectedDate || currentDate]?.map((todoItem) => (
                            <li className={`todoList ${todoItem.completed ? 'completed' : ''}`} key={todoItem.id}>
                                {editedTodoId === todoItem.id ? (
                                    <div className="todo-edit-input">
                                        <input
                                            className="todo-edit"
                                            type="text"
                                            value={editedTodoText}
                                            onChange={(e) => setEditedTodoText(e.target.value)}
                                        />
                                        <button className="todo-edit-btn" onClick={onSaveEdit}>
                                            저장
                                        </button>
                                    </div>
                                ) : (
                                    <div className="todo-list-detail">
                                        <label className="todoList-label">
                                            <input
                                                className="todo-check"
                                                type="checkbox"
                                                checked={todoItem.completed}
                                                onChange={() => toggleCompleted(todoItem.id)}
                                            />
                                            {todoItem.text}
                                        </label>
                                        <div className="todo-btn">
                                            <button
                                                className="todo-edit-btn"
                                                onClick={() => onEdit(todoItem.id, todoItem.text)}
                                            >
                                                <img
                                                    className="todo-edit"
                                                    src={process.env.PUBLIC_URL + '/icons/pencil-line.svg'}
                                                    alt="edit Icon"
                                                />
                                            </button>
                                            <button
                                                className="todo-delete-btn"
                                                type="button"
                                                onClick={() => onDelete(todoItem.id)}
                                            >
                                                <img
                                                    className="todo-delete"
                                                    src={process.env.PUBLIC_URL + '/icons/trash-2.svg'}
                                                    alt="Trash Icon"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}
