import React, { useCallback, useEffect, useRef, useState } from 'react';
import TodoAddForm from './TodoAddForm';
import Todo from './Todo';

export default function TodoListCompo() {
    const [todoList, setTodoList] = useState([]);
    const [id, setId] = useState(0);
    const isMount = useRef(true);

    useEffect(() => {
        if (!isMount.current) {
            localStorage.setItem('todoList', JSON.stringify(todoList));
            localStorage.setItem('id', id);
        }
    }, [todoList, id]);

    useEffect(() => {
        const localTodoList = localStorage.getItem('todoList');
        if (localTodoList) {
            setTodoList(JSON.parse(localTodoList));
        }

        const localId = localStorage.getItem('id');
        if (localId) {
            setId(parseInt(localId));
        }
        isMount.current = false;
    }, []);

    const addTodo = useCallback(
        (todo) => (e) => {
            console.log('add');
            e.preventDefault();
            if (todo) {
                setTodoList((prevTodoList) => [...prevTodoList, { id: id, todo: todo, isChecked: false }]);
                setId((prevId) => prevId + 1);
            }
        },
        [id]
    );

    const updateTodo = useCallback(
        (id, todo, isChecked) => {
            const index = todoList.findIndex((todoInfo) => todoInfo.id === id);
            const newTodoList = [...todoList];
            newTodoList.slice(index, 1, {
                id: id,
                todo: todo,
                isChecked: isChecked,
            });
            setTodoList(newTodoList);
        },
        [todoList]
    );

    const deleteTodo = useCallback(
        (id) => () => {
            const newTodoList = todoList.filter((todoInfo) => todoInfo.id !== id);
            setTodoList(newTodoList);
        },
        [todoList]
    );

    const toggleCheck = useCallback(
        (id) => () => {
            const index = todoList.findIndex((todoInfo) => todoInfo.id === id);
            const newTodoList = [...todoList];
            newTodoList[index].isChecked = newTodoList[index].isChecked ? false : true;
            setTodoList(newTodoList);
        },
        [todoList]
    );

    return (
        <div className="box">
            <div className="todolist-box">
                <h1>things to do</h1>
                <TodoAddForm addTodo={addTodo} />
                <ul>
                    {todoList.map((todoInfo) => {
                        return (
                            <Todo
                                key={todoInfo.id}
                                id={todoInfo.id}
                                todo={todoInfo.todo}
                                isChecked={todoInfo.isChecked}
                                updateTodo={updateTodo}
                                deleteTodo={deleteTodo}
                                toggleCheck={toggleCheck}
                            />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
