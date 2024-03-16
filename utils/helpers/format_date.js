/**
 * @file format_date.js
 * Helper function that utilizes the dayjs JavaScript library to format a given unix timestamp 
 */
const dayjs = require('dayjs');

/**
 * @function format_date 
 * Formats unix timestamp to 'MM D, YYYY at HH:mm'
 * @param {*} unix 
 * @returns {String} formatted date
 */
function format_date(unix) {
	const date = new Date(unix);

	const month = dayjs(date).format('MMM');
	const day = dayjs(date).format('D');
	const year = dayjs(date).format('YYYY');
	const time = dayjs(date).format('HH:mm');
	const suffix = getDaySuffix(day);
				
	return `${month} ${day}${suffix}, ${year} at ${time}`
}

/**
 * @function getDaySuffix
 * Returns the suffix to add after day based on its value
 * @param {*} day 
 * @returns {String} suffix
 */
function getDaySuffix(day) {
	var suffix; 

	if (day > 10 && day < 20) {
		// Return the suffix 'th' if the day is 11-19
		suffix = 'th';
	} else { 
		// Read the number in the oneth place and update suffix based on the value
		switch(day % 10) {
			case 1:
				suffix = 'st';
				break;
			case 2:
				suffix = 'nd';
				break;
			case 3:
				suffix = 'rd';
				break;
			default: 
			suffix = 'th';
		}
	}
	return suffix;
}

module.exports = format_date;
