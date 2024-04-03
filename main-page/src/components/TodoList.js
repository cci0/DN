import React, { useEffect, useState } from 'react';
import '../styles/todoList.scss';

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
            setTodos((currentArray) => [
                ...currentArray,
                {
                    id: Date.now(),
                    text: todo,
                    completed: false,
                },
            ]);
        } else {
            return alert('등록된 리스트가 너무 많습니다.');
        }
        setTodo('');
    };

    const onDelete = (id) => {
        setTodos(todos.filter((todoItem) => todoItem.id !== id));
    };

    const toggleCompleted = (id) => {
        setTodos(
            todos.map((todoItem) => {
                if (todoItem.id === id) {
                    return { ...todoItem, completed: !todoItem.completed };
                }
                return todoItem;
            })
        );
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
