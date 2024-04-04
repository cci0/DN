import React, { useState } from 'react';

export default function Calendar2() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="calendar">
            <div className="header">
                <div>
                    <div>
                        <span>
                            <span>{format(currentMonth, 'M')}월</span>
                            {format(currentMonth, 'yyyy')}
                        </span>
                    </div>
                    <div>
                        <span>&#60;</span>
                        <span>&#62;</span>
                    </div>
                </div>
            </div>
            <div className="days">days</div>
            <div className="body">cells</div>
        </div>
    );
}
