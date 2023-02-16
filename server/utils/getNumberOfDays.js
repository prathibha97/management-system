const moment = require('moment')

const getNumberOfDays = (startDate, endDate) => {
  const start = moment(startDate);
  const end = moment(endDate);
  const duration = moment.duration(end.diff(start));
  const days = duration.asDays();
  return days + (start.hours() !== end.hours() || start.minutes() !== end.minutes() ? 1 : 0);
};

module.exports = getNumberOfDays
