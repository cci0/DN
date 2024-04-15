import React from 'react';

import CalendarTodo from '../components/CalenderTodo';
// import WeeklyCalendarCompo from '../components/WeeklyCalendarCompo';

export default function Calendar() {
    return (
        <div className="mb-calender">
            <CalendarTodo />
            {/* <WeeklyCalendarCompo /> */}
        </div>
    );
}
