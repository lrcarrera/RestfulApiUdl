'use strict';
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

module.exports = function(app) {

  var customerOperations = require('../controllers/customerController');
  var authentication = require('../controllers/authentication');
  var profile = require('../controllers/profile');


  // customerOperations Routes
  /*Add the route like below to restrict access
    router.get('/profile', auth, ctrlProfile.profileRead);
  */
  app.route('/customer')
    .get(customerOperations.list_all_customers)
    .post(customerOperations.create_a_customer);

  app.route('/customer/:customerId')
    .get(customerOperations.get_customer)
    .put(customerOperations.update_customer)
    .delete(customerOperations.delete_customer);


  app.route('/register')
    .post(authentication.register);

  app.route('/login')
    .post(authentication.login);

  app.route('/profile')
    .get(profile.profile_read);

  app.route('/', function(req, res) {
     res.json({ message: 'Welcome to the coolest API!' });
   });
};