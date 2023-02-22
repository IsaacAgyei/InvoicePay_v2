require('dotenv').config()
const config = require('../config/auth.config')
const db = require('../models')
const { refreshToken: RefreshToken } = db;
var jwt = require("jsonwebtoken")

exports.refreshToken = async (req, res) => {
  const cookies = req.headers["x-refresh-access"]

  if (!cookies) {
    return res.status(401).json({ message: "Unauthorized Token missing or invalid", authorized: false  });
  }
  
  try {
    let refreshToken = await RefreshToken.findOne({ token: cookies});

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!", authorized: false });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request", authorized: false 
      });
      return;
    }
    let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: cookies, 
      authorized: true 
    });
  } catch (err) {
    console.log(`Refresh Token Try Catch Block caught an err`)
    return res.status(500).send({ message: `err: ${err}` });
  }
};