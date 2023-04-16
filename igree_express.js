const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const app = express();

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.get('/verifier/v1.0/api/nibss/redirect', (req, res) => {
  const authorizationURL = 'https://idsandbox.nibss-plc.com.ng/oxauth/restv1/authorize';
  const clientID = '630fef78-548e-4e6e-b702-f667de63f523';
  const callbackURL = 'http://127.0.0.1:4022/verifier/v1.0/api/nibss/igree-redirect';

  const redirectURL = `${authorizationURL}?client_id=${clientID}&redirect_uri=${callbackURL}&response_type=code`;
  res.redirect(redirectURL);
});

app.get('/verifier/v1.0/api/nibss/igree-redirect', (req, res) => {
  const code = req.query.code;
  const tokenURL = 'https://idsandbox.nibss-plc.com.ng/oxauth/restv1/token';
  const clientID = '630fef78-548e-4e6e-b702-f667de63f523';
  const clientSecret = 'gC212pMOsLYMhSYHG6ZUFmnZ4V0jw2P7cPcAZwrk';
  const callbackURL = 'http://127.0.0.1:4022/verifier/v1.0/api/nibss/igree-redirect';

  const data = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: callbackURL,
    client_id: clientID,
    client_secret: clientSecret,
  };

  axios
    .post(tokenURL, querystring.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-consumer-unique-id': '01user_unique_number',
        'x-consumer-custom-id': '630fef78-548e-4e6e-b702-f667de63f523',
      },
    })
    .then((response) => {
      // Here, you can access the user profile information from the response.data object,
      // and do any additional processing, such as saving the user information to a database.
      res.redirect('/api');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(4022, () => {
  console.log('OAuth2 server listening on port 4022');
});
