module.exports = {
  secret: process.env.ACCESS_TOKEN_SECRET,
  jwtExpiration: 600, //  10 minutes
  jwtRefreshExpiration: 1200 // 20 minutes
}