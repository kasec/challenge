var mongoose = require("mongoose");

module.exports = function connection() {

  var db = mongoose.createConnection("mongodb://localhost:27017/challengeDB");

  return db
}
