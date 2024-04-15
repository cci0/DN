import React, { useState } from 'react';

export default function ScheduleInput({ date }) {
    const [schedule, setSchedule] = useState('');
    const [time, setTime] = useState('');

    const saveSchedule = () => {
        if (schedule.trim() !== '') {
            // 로컬 스토리지에서 스케줄 가져오기
            let schedules = {};
            const schedulesString = localStorage.getItem('schedules');
            if (schedulesString) {
                try {
                    schedules = JSON.parse(schedulesString);
                } catch (error) {
                    console.error('Error parsing schedules from localStorage:', error);
                }
            }
            const dateString = date.toDateString();

            // 해당 날짜의 일정 배열 불러오기
            const daySchedules = Array.isArray(schedules[dateString]) ? schedules[dateString] : [];

            // 새로운 일정 추가
            daySchedules.push({ schedule, time });

            // 업데이트된 일정을 저장
            schedules[dateString] = daySchedules;
            localStorage.setItem('schedules', JSON.stringify(schedules));

            // 입력창 초기화
            setSchedule('');
            setTime('');
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
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            <button className="schedule-save-btn" onClick={saveSchedule}>
                저장
            </button>
        </div>
    );
}
