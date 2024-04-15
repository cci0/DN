import moment from 'moment';

// 주어진 기간에 해당하는 일정을 필터링하는 함수
export const FilterWeek = (schedules, weekStart, weekEnd) => {
    if (!schedules) return {};

    return Object.keys(schedules).reduce((acc, dateString) => {
        const scheduleDate = moment(dateString);
        if (scheduleDate.isBetween(weekStart, weekEnd, 'day', '[]')) {
            acc[dateString] = schedules[dateString];
        }
        return acc;
    }, {});
};
