var _ = require("lodash");
var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var mongoose = require("mongoose");  
  
var db = mongoose.connect("mongodb://localhost:27017/challengeDB", function(err, response){  
   if(err){ console.log( err); }  
   else{ console.log('Connected to challengeDB'); }  
});

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
  });
  var azael = {name: 'azaelf', password: 'Ey3OfWat3r'}
  var user = mongoose.model('Users', userSchema);
user.find((azael), function(err, users) {
    if (err) return console.error(err);
    if(users.length === 0) {
        var azael = new user({name: 'azaelf', password: 'Ey3OfWat3r'});  
        azael.save(function (err, user) {
        if (err) return console.error(err);
        });
    }
})
// user.remove({name: 'azaelf'}, function(err) {    
//     if(err){    
//         console.log(err);    
//     }    
//     else{      
//            console.log("Record has been Deleted..!!");               
//        }    
// })
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = 'eyeOfWater';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

var app = express();
app.use(passport.initialize());
app.use(function (req, res, next) {        
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
  res.setHeader('Access-Control-Allow-Credentials', true);       
  next();  
}); 
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json())

app.get("/", function(req, res) {
    user.find(function(err, users) {
        if (err) return console.error(err);
        res.json({data: users});
    })
});

app.post("/login", function(req, res) {
  user.find({name: req.body.name, password: req.body.password}, function(err, users) {
    console.log('/login POST')
        if(err) {
          console.error(err)
        }
        if (users.length === 1) {
            var payload = {id: users[0].id};
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({message: "ok", token: token});  
        }
        
        else res.status(401).json({message:"passwords did not match"});
          
  })
  
});

app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json({message: "Success! You can not see this without a token"});
});

app.get("/secretDebug",
  function(req, res, next){
    console.log(req.get('Authorization'));
    next();
  }, function(req, res){
    res.json("debugging");
});

app.listen(3000, function() {
  console.log("Express running");
});