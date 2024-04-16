import React from 'react';

import CalendarCompo from '../components/Calendar/CalendarCompo';
import TodoLists from '../components/TodoLists';

import '../styles/reset.css';
import '../styles/mainPage.scss';

export default function MainPage() {
    return (
        <div className="main-page">
            <CalendarCompo />
            <TodoLists />
        </div>
    );
}
