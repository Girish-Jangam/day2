const mongoose = require("mongoose");

const userLoginSchema = new mongoose.Schema({
  id: String,
  userName: String,
  password: String,
});

module.exports = mongoose.model("UserLogin", userLoginSchema);