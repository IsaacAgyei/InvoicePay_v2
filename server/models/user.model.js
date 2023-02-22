const mongoose = require("mongoose");


const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    stripe_customer: Object
  })
);

module.exports = User;