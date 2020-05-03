require('dotenv').config()

var userSchema = require('../schemas/users');

var jwt = require("jsonwebtoken");

var express = require('express');
var router  = express.Router();

const secretOrKey = process.env.SECRET_KEY;


router.post("/login", function (req, res) {
  userSchema.find({ name: req.body.name, password: req.body.password }, function (
    err,
    users
  ) {
    console.log("/login POST");
    if (err) {
      console.error(err);
    }
    if (users.length === 1) {
      var payload = { id: users[0].id };
      var token = jwt.sign(payload, secretOrKey);
      res.json({ message: "ok", token: token });
    } else res.status(401).json({ message: "passwords did not match" });
  });
});

module.exports = router;
