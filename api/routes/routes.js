'use strict';
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

module.exports = function(app) {

  var customerOperations = require('../controllers/customerController');
  var advisorOperations = require('../controllers/advisorController');

  var authentication = require('../controllers/authentication');
  var profile = require('../controllers/profile');


  // customerOperations Routes
  /*Add the route like below to restrict access
    router.get('/profile', auth, ctrlProfile.profileRead);
  */

  /*CUSTOMER ROUTES*/
  app.route('/customer')
      .get(customerOperations.list_all_customers)
      .post(customerOperations.create_a_customer);

  app.route('/customer/:customerId')
      .get(customerOperations.get_customer)
      .put(customerOperations.update_customer)
      .delete(customerOperations.delete_customer);

  /*ADVISOR ROUTES*/
  app.route('/register')
      .post(authentication.register);

  app.route('/login')
      .post(authentication.login);

  app.route('/profile')
      .get(profile.profile_read);

  /*BANK ACCOUNT ROUTES*/
  app.route('/account/:customerId')
      .put(customerOperations.insert_new_account)
      .get(customerOperations.get_accounts);

  /*MOVEMENTS ACCOUNT ROUTES*/
  app.route('/movement/:customerId')
      .get(customerOperations.get_total_movements);

  /*INVESTMENT ACCOUNT ROUTES*/
  app.route('/investment/:customerId')
      .put(customerOperations.insert_investment_products);


  /**ADVISOR ROUTES**/
  app.route('/customerbyadvisor/:advisorId')
      .get(advisorOperations.list_all_customers_by_advisor);

  app.route('/advisor/:advisorId')
      .get(advisorOperations.get_advisor);

  app.route('/advisor')
      .get(advisorOperations.list_all_advisor);



  app.route('/', function(req, res) {
    res.json({ message: 'Welcome to the coolest API!' });
  });
};
