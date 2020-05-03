var userSchema = require('../schemas/users');

var express = require('express');
var router  = express.Router();

router.get("/all", function (req, res) {
  userSchema.find(function (err, users) {
    if (err) return console.error(err);
    res.json({ data: users });
  });
});

module.exports = router;
