import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';

// css import
import 'react-calendar/dist/Calendar.css';
import '../styles/calendarCompo.scss';

export default function CalendarCompo() {
    const [value, onChange] = useState(new Date());

    return (
        <div>
            <Calendar
                onChange={onChange}
                value={value}
                prev2Label={null}
                next2Label={null}
                locale="ko"
                formatDay={(locale, date) => moment(date).format('D')}
                calendarType="gregory"
            />
        </div>
    );
}
