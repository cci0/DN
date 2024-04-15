import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import ScheduleInput from '../ScheduleInput';
import WeeklySchedule from '../WeeklySchedule';

// css
import 'react-calendar/dist/Calendar.css';
import '../../styles/calendarCompo.scss';
import '../../styles/calendarTodo.scss';

export default function CalendarTodo() {
    const [value, onChange] = useState(new Date());
    const [schedules, setSchedules] = useState({});
    const [editingSchedule, setEditingSchedule] = useState(null);

    useEffect(() => {
        const savedSchedules = JSON.parse(localStorage.getItem('schedules')) || {};
        setSchedules(savedSchedules);
    }, []);

    const haveSchedule = (date) => {
        return schedules[date.toDateString()] !== undefined;
    };

    const mark = ({ date, view }) => {
        if (view === 'month') {
            if (haveSchedule(date)) {
                return (
                    <div className="have-schedule">
                        <div>
                            <div className="mark"></div>
                        </div>
                    </div>
                );
            }
        }
    };

    const showSchedule = () => {
        const dateString = value.toDateString();
        const schedule = schedules[dateString];
        if (schedule) {
            return (
                <div className="mb-calendar-schedule">
                    <ul>
                        {schedule.map((item, index) => (
                            <li className="calendar-schedule-list" key={index}>
                                {editingSchedule === index ? (
                                    <div className="calendar-schedule-input">
                                        <input
                                            type="text"
                                            value={item.schedule}
                                            onChange={(e) => editChange(e.target.value, index, 'schedule')}
                                        />
                                        <input
                                            type="time"
                                            value={item.time}
                                            onChange={(e) => editChange(e.target.value, index, 'time')}
                                        />
                                        <button className="schedule-confirm-btn" onClick={() => confirmBtn()}>
                                            확인
                                        </button>
                                    </div>
                                ) : (
                                    <div className="=schedule-content-list">
                                        <div className="calendar-schedule-content">
                                            <span>{item.schedule}</span> <span>{item.time}</span>
                                        </div>
                                        <div className="schedule-btn">
                                            <button
                                                className="schedule-edit-btn"
                                                onClick={() => setEditingSchedule(index)}
                                            >
                                                수정
                                            </button>
                                            <button
                                                className="schedule-delete-btn"
                                                onClick={() => deleteSchedule(dateString, index)}
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return <div className="non-content">텅!</div>;
        }
    };

    const deleteSchedule = (dateString, index) => {
        const updatedSchedules = { ...schedules };
        updatedSchedules[dateString].splice(index, 1);

        if (updatedSchedules[dateString].length === 0) {
            delete updatedSchedules[dateString];
        }
        setSchedules(updatedSchedules);
        localStorage.setItem('schedules', JSON.stringify(updatedSchedules));
    };

    const editChange = (newValue, index, field) => {
        const updatedSchedules = { ...schedules };
        updatedSchedules[value.toDateString()][index][field] = newValue;
        setSchedules(updatedSchedules);
    };

    const confirmBtn = () => {
        setEditingSchedule(null);
        localStorage.setItem('schedules', JSON.stringify(schedules));
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
            <div className="mb-schedule">
                <div className="calender-todo">
                    <span className="calender-todo-title">오늘의 일정</span>
                    <span className="todo-date">{moment(value).format('YYYY년 MM월 DD일')}</span>
                </div>
                <ScheduleInput date={value} />
                {showSchedule()}
                <WeeklySchedule />
            </div>
        </div>
    );
}
