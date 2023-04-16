const OAuthServer = require('oauth2-server');
const Request = OAuthServer.Request;
const Response = OAuthServer.Response;

const model = {
  getAccessToken: function (bearerToken, callback) {
    // Get the access token for the bearer token
    // Returns an object with the access token information
    // or null if the access token is invalid or has expired
  },

  getClient: function (clientId, clientSecret, callback) {
    // Get the client with the given client id and secret
    // Returns an object with the client information
    // or null if the client is invalid
  },

  saveToken: function (token, client, user, callback) {
    // Save the access token
  },
};

module.exports = function (app) {
  const oauth = new OAuthServer({
    model: model,
    grants: ['authorization_code'],
  });

  app.post('/token', function (req, res) {
    const request = new Request(req);
    const response = new Response(res);

    oauth
      .token(request, response)
      .then(function (token) {
        res.json(token);
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
  });

  app.get('/authorize', function (req, res) {
    const request = new Request(req);
    const response = new Response(res);

    oauth
      .authorize(request, response)
      .then(function (success) {
        res.json(success);
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
  });
};
