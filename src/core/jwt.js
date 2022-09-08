const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

exports.JWT = new (class JWT {
  async sign(userId, isRefreshToken = false) {
    const tokenSecret = !isRefreshToken ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
    const tokenLife = !isRefreshToken ? process.env.ACCESS_TOKEN_LIFE : process.env.REFRESH_TOKEN_LIFE;

    let accessToken = await sign(
      { userId: userId },
      tokenSecret,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      }
    );

    if (!accessToken) return false;

    return accessToken;
  }

  async verify(token, isRefreshToken = false) {
    const tokenSecret = !isRefreshToken ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;

    let decoded = await verify(token, tokenSecret, {
      ignoreExpiration: true,
    });

    if (!decoded) return false;

    return decoded;
  }
})();
