import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';

// css
import 'react-calendar/dist/Calendar.css';
import '../styles/calendarCompo.scss';

export default function CalendarCompo() {
    const [value, onChange] = useState(new Date());
    const [schedules, setSchedules] = useState({});

    useEffect(() => {
        const savedSchedules = JSON.parse(localStorage.getItem('schedules')) || {};
        setSchedules(savedSchedules);
    }, []);

    const hasSchedule = (date) => {
        return schedules[date.toDateString()] !== undefined;
    };

    const mark = ({ date, view }) => {
        if (view === 'month') {
            if (hasSchedule(date)) {
                return <div className="has-schedule"></div>;
            }
        }
        return null;
    };

    return (
        <div className="mb-calender">
            <Calendar
                onChange={onChange}
                value={value}
                prev2Label={null}
                next2Label={null}
                locale="ko"
                formatDay={(locale, date) => moment(date).format('D')}
                calendarType="gregory"
                tileContent={mark}
            />
        </div>
    );
}
