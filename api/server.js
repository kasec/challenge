var express = require("express");
var bodyParser = require("body-parser");

var passport = require('./auth');

var userSchema = require('./schemas/users');
var usersMock = require("./mocks/users");

//create user if it is not created before.
userSchema.find(usersMock.azael, function (err, users) {
  if (err) return console.error(err);
  if (users.length === 0) {
	console.log('creating new user')
    var newUser = new userSchema(usersMock.azael);

    newUser.save(function (err, user) {
      if (err) return console.error(err);
    });
  }
});


var app = express();
app.use(passport.initialize());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// parse application/json
app.use(bodyParser.json());

app.use('/api/users', passport.authenticate("jwt", { session: false }), require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

app.get(
  "/secretDebug",
  function (req, res, next) {
    console.log(req.get("Authorization"));
    next();
  },
  function (req, res) {
    res.json("debugging");
  }
);

app.listen(3000, function () {
  console.log("API REST its running at 3000");
});
