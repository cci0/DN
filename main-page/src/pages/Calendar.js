import React from 'react';

import CalendarCompo from '../components/CalendarCompo';
import WeeklyCalendarCompo from '../components/WeeklyCalendarCompo';

export default function Calendar() {
    return (
        <div>
            <CalendarCompo />
            <WeeklyCalendarCompo />
        </div>
    );
}
