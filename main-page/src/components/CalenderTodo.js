import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import ScheduleInput from './ScheduleInput';

// css
import 'react-calendar/dist/Calendar.css';
import '../styles/calendarCompo.scss';

export default function CalendarTodo() {
    const [value, onChange] = useState(new Date());
    const [schedules, setSchedules] = useState({});
    const [editingSchedule, setEditingSchedule] = useState(null);

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
                                {editingSchedule === index ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => handleEditChange(e.target.value)}
                                        />
                                        <button onClick={() => handleConfirmEdit(index)}>확인</button>
                                    </div>
                                ) : (
                                    <div>
                                        {item}
                                        <button onClick={() => setEditingSchedule(index)}>수정</button>
                                        <button onClick={() => handleDeleteSchedule(dateString, index)}>삭제</button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return <div>일정이 없습니다.</div>;
        }
    };

    // 일정 삭제 함수
    const handleDeleteSchedule = (dateString, index) => {
        const updatedSchedules = { ...schedules };
        updatedSchedules[dateString].splice(index, 1); // 해당 인덱스의 일정 삭제
        setSchedules(updatedSchedules);
        localStorage.setItem('schedules', JSON.stringify(updatedSchedules)); // 변경된 일정을 로컬 스토리지에 저장
    };

    // 수정 중인 일정 변경
    const handleEditChange = (newValue) => {
        const updatedSchedules = [...schedules[value.toDateString()]];
        updatedSchedules[editingSchedule] = newValue;
        setSchedules({ ...schedules, [value.toDateString()]: updatedSchedules });
    };

    // 일정 수정 완료
    const handleConfirmEdit = (index) => {
        setEditingSchedule(null); // 수정 중인 일정 종료
        localStorage.setItem('schedules', JSON.stringify(schedules)); // 변경된 일정을 로컬 스토리지에 저장
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
            <div className="calender-todo">
                To Do List
                <span className="todo-date">&#40;{moment(value).format('YYYY년 MM월 DD일')}&#41;</span>
            </div>
            <ScheduleInput date={value} />
            {showSchedule()}
        </div>
    );
}
