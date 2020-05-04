var express = require('express');
var app = express();
app.use(express.static('dist/challengeApp'));
app.get('/', function (req, res,next) {
    res.redirect('/');
});
app.listen(8080, function () {
	console.log("WEB its running at 8080");
  });
