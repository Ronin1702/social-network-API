// Adds suffix to date (e.g., "st" in "1st", "nd" in "2nd", etc.)
const addDateSuffix = (date) => {
    const dateStr = date.toString();
    const lastDigit = dateStr.slice(-1);

    switch (lastDigit) {
        case '1':
            return dateStr + (dateStr === '11' ? 'th' : 'st');
        case '2':
            return dateStr + (dateStr === '12' ? 'th' : 'nd');
        case '3':
            return dateStr + (dateStr === '13' ? 'th' : 'rd');
        default:
            return dateStr + 'th';
    }
};

// Formats the time part of the timestamp
const formatTime = (dateObj) => {
    let hour = dateObj.getHours() > 12 ? dateObj.getHours() - 12 : dateObj.getHours();
    // Handle edge case of midnight
    hour = hour === 0 ? 12 : hour;

    // Zero-pad minutes less than 10
    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();

    // Determine AM or PM
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

    return `${hour}:${minutes} ${periodOfDay}`;
};

// Returns the name of the month based on the month index and the desired length ('short' or 'long')
const getMonthName = (monthIndex, monthLength = 'short') => {
    const monthNames = [
        ['Jan', 'January'],
        ['Feb', 'February'],
        ['Mar', 'March'],
        ['Apr', 'April'],
        ['May', 'May'],
        ['Jun', 'June'],
        ['Jul', 'July'],
        ['Aug', 'August'],
        ['Sep', 'September'],
        ['Oct', 'October'],
        ['Nov', 'November'],
        ['Dec', 'December']
    ];

    return monthNames[monthIndex][monthLength === 'short' ? 0 : 1];
};

// Main function to format timestamp
// Options can be passed for month name length and whether to add a date suffix
module.exports = (timestamp, { monthLength = 'short', dateSuffix = true } = {}) => {
    const dateObj = new Date(timestamp);
    const formattedMonth = getMonthName(dateObj.getMonth(), monthLength);
    const dayOfMonth = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate();
    const year = dateObj.getFullYear();
    const formattedTime = formatTime(dateObj);

    return `${formattedMonth} ${dayOfMonth}, ${year} at ${formattedTime}`;
};
