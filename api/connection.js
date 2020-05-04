var mongoose = require("mongoose");
require('dotenv').config();

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_DB = process.env.MONGO_DB;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;

module.exports = function connection() {

//   mongoose.connect("mongodb://localhost:27017/challengeDB");
   mongoose.connect("mongodb+srv://"
  	+ MONGO_USER + ":" + MONGO_PASS + "@"+ MONGO_HOST +"/"+MONGO_DB+"?retryWrites=true&w=majority",{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 5000
	  }).catch(err => console.log(err.reason));
	var db = mongoose.connection
  return db
}
