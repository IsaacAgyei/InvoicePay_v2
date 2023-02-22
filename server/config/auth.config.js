module.exports = {
  secret: process.env.ACCESS_TOKEN_SECRET,
  jwtExpiration: 600, //  10 minutes 600
  jwtRefreshExpiration: 1200,  // 20 minutes 1200
}