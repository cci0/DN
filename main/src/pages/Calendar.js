import React from 'react';

import CalendarCompo from '../components/CalendarCompo';
import CalendarTodo from '../components/CalenderTodo';
import WeeklySchedule from '../components/WeeklySchedule';
// import WeeklyCalendarCompo from '../components/WeeklyCalendarCompo';

export default function Calendar() {
    return (
        <div className="mb-calender">
            <CalendarTodo />
            {/* <WeeklySchedule /> */}
            {/* <WeeklyCalendarCompo /> */}
        </div>
    );
}
