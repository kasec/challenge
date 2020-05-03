
var mongoose = require("mongoose");
var db = require("../connection");

var Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userSchema = db().model("Users", Schema);

module.exports = userSchema;
