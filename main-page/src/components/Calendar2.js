import React, { useState } from 'react';
import {
    addDays,
    addMonths,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    parse,
    startOfMonth,
    startOfWeek,
    subMonths,
} from 'date-fns';

import '../styles/calendar2.scss';

const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header row">
            <div className="col col-start">
                <div className="col col-end">
                    <button className="arrow arrow-left" onClick={prevMonth}>
                        &#60;
                    </button>
                    <div className="text">
                        <span className="text month">
                            <span>{currentMonth.getMonth() + 1}월</span>
                            {currentMonth.getFullYear()}
                        </span>
                    </div>
                    <button onClick={nextMonth}>&#62;</button>
                </div>
            </div>
        </div>
    );
};

const CalnederDays = () => {
    const days = [];
    const date = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>
        );
    }

    return <div className="days row">{days}</div>;
};

const CalendarCell = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                            ? 'selected'
                            : format(currentMonth, 'M') !== format(day, 'M')
                            ? 'not-valid'
                            : 'valid'
                    }`}
                    key={day}
                    onClick={() => onDateClick(parse(cloneDay))}
                >
                    <span className={format(currentMonth, 'M') !== format(day, 'M') ? 'text not-valid' : ''}>
                        {' '}
                        {formattedDate}
                    </span>
                    <div className="daily-content"></div>
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="week" key={day}>
                {days}
            </div>
        );
        days = [];
    }

    return <div className="body">{rows}</div>;
};

export default function Calendar2() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    // 달 움직이기
    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const onDateClick = (day) => {
        setSelectedDate(day);
    };

    return (
        <div className="calendar">
            <CalendarHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
            <CalnederDays />
            <CalendarCell currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={onDateClick} />
        </div>
    );
}
