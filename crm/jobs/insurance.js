const INSURANCE = require('../data/insurance');
const createInsurance = require('../instruments/createInsurance');

for (const insurance of INSURANCE) {
  createInsurance(insurance);
}
