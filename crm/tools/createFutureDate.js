const moment = require('moment');

function getDateXDaysAhead(x) {
  const today = moment();
  const futureDate = today.clone().add(x, 'days');
  return futureDate.format('YYYY-MM-DD');
}

module.exports = getDateXDaysAhead;
