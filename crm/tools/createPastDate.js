const moment = require('moment');

function getDateXDaysPast(x) {
  const today = moment();
  const futureDate = today.clone().subtract(x, 'days');
  return futureDate.format('YYYY-MM-DD');
}

module.exports = getDateXDaysPast;
