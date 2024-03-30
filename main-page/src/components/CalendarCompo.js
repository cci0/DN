import React, { useState } from 'react';
import Calendar from '../pages/Calendar';

export default function CalendarCompo() {
    const [value, onChange] = useState(new Date());

    return (
        <Wrap>
            <Calendar onChange={onChange} value={value} />
        </Wrap>
    );
}
