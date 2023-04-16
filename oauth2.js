const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;

const app = express();

passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: 'https://idsandbox.nibss-plc.com.ng/oxauth/restv1/authorize',
      tokenURL: 'https://idsandbox.nibss-plc.com.ng/oxauth/restv1/token',
      clientID: '630fef78-548e-4e6e-b702-f667de63f523',
      clientSecret: 'gC212pMOsLYMhSYHG6ZUFmnZ4V0jw2P7cPcAZwrk',
      callbackURL: 'http://127.0.0.1:4022/verifier/v1.0/api/nibss/igree-redirect',
      scope: 'BVN',
      customHeaders: {
        'x-consumer-unique-id': '01user_unique_number',
        'x-consumer-custom-id': '630fef78-548e-4e6e-b702-f667de63f523',
      },
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you can access the user profile and do any additional processing,
      // such as saving the user information to a database.
      return done(null, profile);
    }
  )
);

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.get('/verifier/v1.0/api/nibss/redirect', passport.authenticate('oauth2'));

app.get(
  '/verifier/v1.0/api/nibss/igree-redirect',
  passport.authenticate('oauth2', {
    response_type: 'code',
    grant_type: 'authorization_code',
  }),
  (req, res) => {
    res.redirect('/api');
  }
);

app.listen(4022, () => {
  console.log('OAuth2 server listening on port 4022');
});
