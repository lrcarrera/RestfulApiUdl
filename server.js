const cool = require('cool-ascii-faces')
const cors = require('cors')
const express = require('express');
const app = express();
let path = require('path');
let bodyParser = require('body-parser');
let passport = require('passport');
require('./api/config/passport');
let Customer = require('./api/models/customers');
require('./api/models/users');

let mongoose = require ("mongoose");
let theport = process.env.PORT || 5000;

let uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://heroku_l7t0z2hl:rpihc5nokv98besvm18vh82sdh@ds211625.mlab.com:11625/heroku_l7t0z2hl';

mongoose.Promise = global.Promise;

mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



const routes = require('./api/routes/routes');
routes(app);

app.use(function (err, req, res) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

app.listen(theport);
