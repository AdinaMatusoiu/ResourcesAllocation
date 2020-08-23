module.exports = {
    getDate,
}

function getDate(dateString) {
    let actualDate = new Date(dateString);
    actualDate.setHours(actualDate.getHours() + 3, 0, 0);
    return actualDate;
}