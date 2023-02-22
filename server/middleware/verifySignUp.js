const db = require('../models')
const User = db.user

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  User.findOne({
    username: await req.body.username
  }).exec( async (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      console.log(`FAILED: ${user.username} is already in use!`)
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: await req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        console.log(`FAILED: ${user.email} is already in use!`)
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail
}

module.exports = verifySignUp