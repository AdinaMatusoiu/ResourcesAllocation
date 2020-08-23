export const months = [
    { id: 0, name: 'January' },
    { id: 1, name: 'February' },
    { id: 2, name: 'March' },
    { id: 3, name: 'April' },
    { id: 4, name: 'May' },
    { id: 5, name: 'June' },
    { id: 6, name: 'July' },
    { id: 7, name: 'August' },
    { id: 8, name: 'September' },
    { id: 9, name: 'Octomber' },
    { id: 10, name: 'November' },
    { id: 11, name: 'December' },
]

export function getDate(dateString) {
    console.log(dateString);
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