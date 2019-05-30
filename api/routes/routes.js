'use strict';
let jwt = require('express-jwt');
let auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

module.exports = function(app) {

  let customerOperations = require('../controllers/customerController');
  let advisorOperations = require('../controllers/advisorController');

  let authentication = require('../controllers/authentication');
  let profile = require('../controllers/profile');


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
      .get(customerOperations.get_total_movements)
      .put(customerOperations.insert_movement_to_account);

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

  /*PRODUCTS ACCOUNT ROUTES*/
  app.route('/task/:customerId')
      .put(advisorOperations.create_customer_task);

  /*PRODUCTS ACCOUNT ROUTES*/
  app.route('/product/:customerId')
      .put(advisorOperations.profile_customer_products);



  app.route('/', function(req, res) {
    res.json({ message: 'Welcome to the coolest API!' });
  });
};
