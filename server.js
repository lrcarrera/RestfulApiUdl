const cool = require('cool-ascii-faces')
var express = require('express'),
  app = express(),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');
var mongoose = require ("mongoose");
var theport = process.env.PORT || 5000;

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://heroku_l7t0z2hl:rpihc5nokv98besvm18vh82sdh@ds211625.mlab.com:11625/heroku_l7t0z2hl';
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/Tododb');

mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route

app.listen(theport);

console.log('todo list RESTful API server started on: ' + theport);
