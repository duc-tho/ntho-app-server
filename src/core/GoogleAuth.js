const { JWT } = require("google-auth-library");

class GoogleAuth {
  getJWTAccessToken() {
    return new Promise(function (resolve, reject) {
      const key = require("../../fbauth.json");
      let jwtClient = new JWT(
        key.client_email,
        null,
        key.private_key,
        ["https://www.googleapis.com/auth/cloud-platform"],
        null
      );
      jwtClient.authorize(function (err, tokens) {
        if (err) {
          reject(err);
          return;
        }
        resolve(tokens.access_token);
      });
    });
  };
}

exports.GoogleAuth = new GoogleAuth();
