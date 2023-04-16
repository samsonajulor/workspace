const axios = require('axios');
const baseURL = 'https://dev.abbeymortgagebank.com:4011/crm/v1.0/api';

async function createInsurance(INSURANCE_DATA) {
  try {
    console.log('calling createInsurance...')
    const response = await axios.post(`${baseURL}/instrument/insurance`, INSURANCE_DATA, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDQ0ODM0MjJ9.8Iv_BWjvocReNUMyIoi3z7czybA5qKuW3zraig3G-Iw',
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
}

module.exports = createInsurance;
