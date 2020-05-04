var express = require('express');
var app = express();
const path = require('path');
app.use(express.static(__dirname ,'/dist/challengeApp'));
app.get('/', function (req, res,next) {
    res.redirect('/');
});
app.listen(8080, function () {
	console.log("WEB its running at 8080");
  });
