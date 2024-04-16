import React from 'react';

import CalendarTodo from '../components/Calendar/CalenderTodo';

import '../styles/calendar.scss';

export default function Calendar() {
    return (
        <div className="mb-calender">
            <CalendarTodo />
        </div>
    );
}
