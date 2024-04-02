import React from 'react';

import CalendarCompo from '../components/CalendarCompo';
import TodoList from '../components/TodoList/TodoList';

export default function MainPage() {
    return (
        <div>
            <CalendarCompo />
            <TodoList />
        </div>
    );
}
