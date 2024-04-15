import React, { useState } from 'react';
import moment from 'moment';

// css
import '../styles/calendarCompo.scss';

export default function WeeklySchedule({ date, schedules }) {
    const [weekStart, setWeekStart] = useState(moment(date).startOf('week'));
    const [weekEnd, setWeekEnd] = useState(moment(date).endOf('week'));

    const filteredSchedules = schedules
        ? Object.keys(schedules).reduce((acc, dateString) => {
              const scheduleDate = moment(dateString);
              if (scheduleDate.isBetween(weekStart, weekEnd, 'day', '[]')) {
                  acc[dateString] = schedules[dateString];
              }
              return acc;
          }, {})
        : {};

    const handlePrevWeek = () => {
        setWeekStart(moment(weekStart).subtract(7, 'days'));
        setWeekEnd(moment(weekEnd).subtract(7, 'days'));
    };

    const handleNextWeek = () => {
        setWeekStart(moment(weekStart).add(7, 'days'));
        setWeekEnd(moment(weekEnd).add(7, 'days'));
    };

    const renderSchedule = () => {
        return Object.keys(filteredSchedules).map((dateString) => {
            return (
                <div key={dateString}>
                    <h3>{moment(dateString).format('YYYY년 MM월 DD일')}</h3>
                    <ul>
                        {filteredSchedules[dateString].map((schedule, index) => (
                            <li key={index}>{schedule.title}</li>
                        ))}
                    </ul>
                </div>
            );
        });
    };

    return (
        <div className="weekly-schedule">
            <div className="schedule-navigation">
                <button onClick={handlePrevWeek}>이전 주</button>
                <span>
                    {weekStart.format('YYYY년 MM월 DD일')} - {weekEnd.format('YYYY년 MM월 DD일')}
                </span>
                <button onClick={handleNextWeek}>다음 주</button>
            </div>
            {renderSchedule()}
        </div>
    );
}
