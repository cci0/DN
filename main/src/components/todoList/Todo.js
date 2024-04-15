import React from 'react';

export default function Todo({ todoItem, onDelete, toggleCompleted }) {
    return (
        <li className={`todoList ${todoItem.completed ? 'completed' : ''}`}>
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
    );
}
