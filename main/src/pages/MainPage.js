import React from 'react';

import TodoList from '../components/TodoList';
import CalendarCompo from '../components/Calendar/CalendarCompo';

export default function MainPage() {
    return (
        <div>
            <CalendarCompo />
            <TodoList />
        </div>
    );
}
