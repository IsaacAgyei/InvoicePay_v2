const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { TokenExpiredError } = jwt

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({message: "Unauthorized! Access Token expired", authorized: false})
  }
  return res.status(401).send({message: "Unauthorized!", authorized: false})
}

const verifyToken = async (req, res, next) => {
   const cookie = req.headers["x-access-token"]
   
  if (!cookie) {
    console.log(`No Access Token Provided`)
    return res.status(403).send({ message: "No token provided!", authorized: false });
  }

  if(cookie) {
    jwt.verify(cookie, config.secret, async (err, decoded) => {
      if (err) {
        console.log(`Invalid Access Token || cookie found`)
        return catchError(err, res)
      }
      req.userId = decoded.id;
      console.log(`Verified JWT`)
      next();
  });
}};

const authJwt = {verifyToken};
module.exports = authJwt;
