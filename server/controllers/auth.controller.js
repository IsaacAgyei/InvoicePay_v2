require('dotenv').config()
const config = require('../config/auth.config')
const db = require('../models')
const { user: User, refreshToken: RefreshToken } = db;
var jwt = require("jsonwebtoken")
var bcrypt = require('bcryptjs')
const stripe = require('stripe')(process.env.STRIPE)

async function jwtSign (payload, secret, expiry) {
  return jwt.sign(
    payload, 
    secret, 
    { expiresIn: expiry }
    );
}
exports.signup = async (req, res) => {
  const {username, email, password} = req.body
  
  if(username === "" || username.includes(" ")) {
    return res.status(500).send({ message: "Invalid Username" })
  }
  if(email === "" || email.includes(" ")) {
    return res.status(500).send({ message: "Invalid Email" })
  }
  if(password === "" || password.includes(" ")) {
    return res.status(500).send({ message: "Invalid Password}" })
  }
  const user = new User({
    username: await req.body.username,
    email: await req.body.email,
    password: bcrypt.hashSync(await req.body.password, 10)
  })

  const stripeCustomer = await stripe.customers.create({
    id: user._id.toString().toUpperCase(),
    email: user.email
  })

  user.stripe_customer = stripeCustomer
  user.save( (err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return;
    }
  })
  res.status(200).send({message: `${user.username} Created Successfully!`})
  return;
}

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .exec( async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
         res.status(404).send({ 
          message: "User Not found", 
          publicMessage: "The username or password you entered is incorrect",
          loginStatus: false 
        });
         return
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        res.status(401).send({
          accessToken: null,
          message: "Invalid Password",
          publicMessage: "The username or password you entered is incorrect",
          loginStatus: false
        });
        return
      }

      const token = await jwtSign({id: user.id}, config.secret, config.jwtExpiration)
      const refreshToken = await RefreshToken.createToken(user)
      req.session.sid = refreshToken
      
      res.status(200).send({
        accessToken: token,
        refreshToken: req.session.sid,
        username: user.username,
        loginStatus: true
      });
    });
};

  exports.logout = (req, res) => {
    RefreshToken.findOne({ 
      token: req.headers["x-refresh-access"]
    })
    .exec(
      (err, refreshToken) => {
        if(err){
          return res.status(400).json({ message: err, logoutStatus: true});
        }

        if(!refreshToken){
          return res.status(400).json({ message: `User Logged out, refresh token cookie erased`, logoutStatus: true});
        }

        RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec(
          (err, refreshToken) => {
            if(err){
              return res.status(400).json({ message: err, logoutStatus: true});
            }
            return res.status(200).json({ message: `Successful User Logout!!!!`, logoutStatus: true})
          }
        )
      })
  }