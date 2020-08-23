module.exports = {
    getDate, randomIntFromInterval
}

function getDate(dateString) {
    let actualDate = new Date(dateString);
    actualDate.setHours(actualDate.getHours() + 3, 0, 0);
    return actualDate;
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}