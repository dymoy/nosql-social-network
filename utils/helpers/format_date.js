const dayjs = require('dayjs');

function format_date(unix) {
	const date = new Date(unix);

	const month = dayjs(date).format('MMM');
	const day = dayjs(date).format('D');
	const year = dayjs(date).format('YYYY');
	const time = dayjs(date).format('HH:mm');
	const suffix = getDaySuffix(day);
				
	return `${month} ${day}${suffix}, ${year} at ${time}`
}

function getDaySuffix(day) {
	var suffix; 
	if (day > 10 && day < 20) {
		suffix = 'th';
	} else { 
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
