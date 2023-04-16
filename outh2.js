const express = require('express');
const OAuthServer = require('oauth2-server');
const Request = OAuthServer.Request;
const Response = OAuthServer.Response;

const app = express();
const oauth = new OAuthServer({
  model: require('./models/oauth-model'),
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authorizationConfig = {
  authorizationURL: 'https://idsandbox.nibss-plc.com.ng/oxauth/restv1/authorize',
  tokenURL: 'https://idsandbox.nibss-plc.com.ng/oxauth/restv1/token',
  clientID: '630fef78-548e-4e6e-b702-f667de63f523',
  clientSecret: 'gC212pMOsLYMhSYHG6ZUFmnZ4V0jw2P7cPcAZwrk',
  callbackURL: 'http://127.0.0.1:4022/verifier/v1.0/api/nibss/redirect-callback',
  scope: 'BVN',
};

app.get('/oauth/authorize', async (req, res, next) => {
  const request = new Request(req);
  const response = new Response(res);

  try {
    const authorized = await oauth.authorize(request, response, {
      authenticateHandler: {
        handle: (request, response) => {
          // handle authentication of the user
          // and return a user object
          // or throw an error if authentication failed
        },
      },
      ...authorizationConfig,
    });
    res.json(authorized);
  } catch (err) {
    next(err);
  }
});

app.post('/oauth/token', async (req, res, next) => {
  const request = new Request(req);
  const response = new Response(res);

  try {
    const token = await oauth.token(request, response, authorizationConfig);
    res.json(token);
  } catch (err) {
    next(err);
  }
});

app.listen(3000, () => {
  console.log('Server is running on 3000');
});
