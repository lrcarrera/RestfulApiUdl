const cool = require('cool-ascii-faces')
var cors = require('cors')
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
require('./api/config/passport');
var Customer = require('./api/models/customers');
require('./api/models/users');
//created model loading here
var bodyParser = require('body-parser');



var mongoose = require ("mongoose");
var theport = process.env.PORT || 5000;

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://heroku_l7t0z2hl:rpihc5nokv98besvm18vh82sdh@ds211625.mlab.com:11625/heroku_l7t0z2hl';

mongoose.Promise = global.Promise;

mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//initialize passport
app.use(passport.initialize());
app.use(cors());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

app.listen(theport);
