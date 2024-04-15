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

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            if (hasSchedule(date)) {
                return <div className="has-schedule"></div>;
            }
        }
    };

    // 선택된 날짜의 일정을 보여주는 함수
    const showSchedule = () => {
        const dateString = value.toDateString();
        const schedule = schedules[dateString];
        if (schedule) {
            return (
                <div>
                    <ul>
                        {schedule.map((item, index) => (
                            <li key={index}>
                                <div>{item}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return <div>일정이 없습니다.</div>;
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
                tileContent={tileContent}
            />
        </div>
    );
}
