import React, { useState } from 'react';
import '../styles/calenderInput.scss';

export default function ScheduleInput({ date }) {
    const [schedule, setSchedule] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedColor, setSelectedColor] = useState('#798777');

    const saveSchedule = () => {
        if (schedule.trim() !== '' && startTime !== '' && endTime !== '') {
            if (startTime >= endTime) {
                alert('시작 시간은 끝 시간보다 이전이어야 합니다.');
                return;
            }

            let schedules = {};
            const schedulesString = localStorage.getItem('schedules');
            if (schedulesString) {
                try {
                    schedules = JSON.parse(schedulesString);
                } catch (error) {
                    console.error('로컬스토리지 오류가 발생', error);
                }
            }
            const dateString = date.toDateString();

            const daySchedules = Array.isArray(schedules[dateString]) ? schedules[dateString] : [];

            daySchedules.push({ schedule, startTime, endTime, selectedColor });

            schedules[dateString] = daySchedules;
            localStorage.setItem('schedules', JSON.stringify(schedules));

            setSchedule('');
            setStartTime('');
            setEndTime('');
        } else {
            alert('모두 입력해 주세요.');
        }
    };

    return (
        <div className="mb-schedule-input">
            <input
                className="schedule-input"
                type="text"
                placeholder="오늘의 할 일을 적으세요"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
            />
            <input
                className="schedule-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
            />
            <span className="wave">~</span>
            <input className="schedule-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            <input
                className="color-picker"
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
            />
            <button className="schedule-save-btn" onClick={saveSchedule}>
                <img className="plus-img" src={process.env.PUBLIC_URL + '/icons/plus.svg'} alt="plus" />
            </button>
        </div>
    );
}
