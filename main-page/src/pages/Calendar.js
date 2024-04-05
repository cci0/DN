import React from 'react';

import CalendarCompo from '../components/CalendarCompo';
import WeeklyCalendarCompo from '../components/WeeklyCalendarCompo';
import Calendar2 from '../components/Calendar2';

export default function Calendar() {
    return (
        <div>
            <CalendarCompo />
            <WeeklyCalendarCompo />
            <Calendar2 />
        </div>
    );
}
