import React, { useEffect, useState } from 'react';
import '../styles/todoList.scss';

export default function TodoList() {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todoList')) || [];
        setTodos(savedTodos);
    }, [todos.length]);

    // 새로운 todo를 추가
    const addTodo = (newTodo) => {
        if (todos.length < 10) {
            setTodos((prevTodos) => [...prevTodos, newTodo]);
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
        setTodos((prevTodos) => prevTodos.filter((todoItem) => todoItem.id !== id));
    };

    const toggleCompleted = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todoItem) => {
                if (todoItem.id === id) {
                    return { ...todoItem, completed: !todoItem.completed };
                }
                return todoItem;
            })
        );
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
                {todos.map((todoItem) => (
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
