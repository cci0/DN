import React from 'react';

import TodoLists from '../components/TodoLists';
import CalendarCompo from '../components/Calendar/CalendarCompo';

export default function MainPage() {
    return (
        <div>
            <CalendarCompo />
            <TodoLists />
        </div>
    );
}
