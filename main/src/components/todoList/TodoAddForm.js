import React, { useEffect, useRef, useState } from 'react';

export default function TodoAddForm({ addTodo }) {
    const [value, setValue] = useState('');
    const input = useRef(null);

    useEffect(() => {
        input.current.focus();
        setValue('');
    }, [addTodo]);

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <form className="todo-add-form">
            <input className="todo-input" ref={input} value={value} onChange={onChangeInput} />
            <button className="todo-input-btn" type="submit" onClick={addTodo(value)}>
                추가
            </button>
        </form>
    );
}
