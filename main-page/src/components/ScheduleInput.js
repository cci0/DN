import React, { useState } from 'react';

export default function ScheduleInput({ date }) {
    const [schedule, setSchedule] = useState('');

    const saveSchedule = () => {
        if (schedule.trim() !== '') {
            // 로컬 스토리지에서 스케줄 가져오기, 없으면 빈 객체로 초기화
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

            // 해당 날짜의 일정 배열 불러오기, 없으면 빈 배열로 초기화
            const daySchedules = Array.isArray(schedules[dateString]) ? schedules[dateString] : [];

            // 새로운 일정 추가
            daySchedules.push(schedule);

            // 업데이트된 일정을 저장
            schedules[dateString] = daySchedules;
            localStorage.setItem('schedules', JSON.stringify(schedules));

            // 입력창 초기화
            setSchedule('');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="일정을 입력하세요"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
            />
            <button onClick={saveSchedule}>저장</button>
        </div>
    );
}
