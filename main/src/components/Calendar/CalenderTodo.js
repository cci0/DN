import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import ScheduleInput from '../ScheduleInput';

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
                const dateString = date.toDateString();
                const backgroundColor = schedules[dateString][0].selectedColor;
                return (
                    <div className="have-schedule">
                        <div className="mark" style={{ backgroundColor }}></div>
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
                                            className="schedule-input"
                                            type="text"
                                            value={item.schedule}
                                            onChange={(e) => editChange(e.target.value, index, 'schedule')}
                                        />
                                        <input
                                            className="schedule-time"
                                            type="time"
                                            value={item.startTime}
                                            onChange={(e) => editChange(e.target.value, index, 'startTime')}
                                        />
                                        <span className="wave">~</span>
                                        <input
                                            className="schedule-time"
                                            type="time"
                                            value={item.endTime}
                                            onChange={(e) => editChange(e.target.value, index, 'endTime')}
                                        />

                                        <button className="schedule-confirm-btn" onClick={() => confirmBtn()}>
                                            확인
                                        </button>
                                    </div>
                                ) : (
                                    <div className="schedule-content-list">
                                        <div className="calendar-schedule-content">
                                            <span className="schedule-title">{item.schedule}</span>
                                            <span className="schedule-time">
                                                {item.startTime} ~ {item.endTime}
                                            </span>{' '}
                                        </div>
                                        <div className="schedule-btn">
                                            <button
                                                className="schedule-edit-btn"
                                                onClick={() => setEditingSchedule(index)}
                                            >
                                                <img
                                                    className="edit-img"
                                                    src={process.env.PUBLIC_URL + '/icons/pencil-line.svg'}
                                                    alt="edit"
                                                />
                                            </button>
                                            <button
                                                className="schedule-delete-btn"
                                                onClick={() => deleteSchedule(dateString, index)}
                                            >
                                                <img
                                                    className="delete-img"
                                                    src={process.env.PUBLIC_URL + '/icons/trash-2.svg'}
                                                    alt="delete"
                                                />
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
            return <div className="non-content">일정이 비어있습니다!</div>;
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
            </div>
        </div>
    );
}
