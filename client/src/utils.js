export const months = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'Octomber' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' },
]

export function getDate(dateString) {
    let actualDate = new Date(dateString);
    actualDate.setHours(actualDate.getHours() + 3, 0, 0);
    return actualDate;
}

export function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days.map(day => getDate(new Date(day).toLocaleDateString('en-US')))
}