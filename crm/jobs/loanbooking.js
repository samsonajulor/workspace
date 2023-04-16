const LOANS = require('../data/loan');
const createLoanBooking = require('../instruments/createLoanBooking');

for (const loan of LOANS) {
  createLoanBooking(loan);
}
