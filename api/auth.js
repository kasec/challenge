require('dotenv').config();

var passport = require("passport");
var passportJWT = require("passport-jwt");
var userSchema = require('./schemas/users');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_KEY;

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log("payload received", jwt_payload);
  userSchema.findById(jwt_payload.id, function (err, user) {
    if (err) return console.error(err);
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});

passport.use(strategy);

module.exports = passport;
// based on https://github.com/mikenicholson/passport-jwt
// based on http://www.passportjs.org/packages/passport-jwt/
