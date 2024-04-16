import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment';

// css
import 'react-calendar/dist/Calendar.css';
import '../../styles/calendarCompo.scss';

export default function CalendarCompo() {
    const [value, onChange] = useState(new Date());
    const [schedules, setSchedules] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const savedSchedules = JSON.parse(localStorage.getItem('schedules')) || {};
        setSchedules(savedSchedules);
    }, []);

    const haveSchedule = (date) => {
        return schedules[date.toDateString()] !== undefined;
    };

    const click = () => {
        navigate('/Calendar');
    };

    const mark = ({ date, view }) => {
        if (view === 'month') {
            if (haveSchedule(date)) {
                const dateString = date.toDateString();
                const backgroundColor = schedules[dateString][0].selectedColor;
                return (
                    <div className="have-schedule" onClick={click}>
                        <div className="mark" style={{ backgroundColor }}></div>
                    </div>
                );
            }
        }
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
