'use strict';
let jwt = require('express-jwt');
const config = require('../config/config-auth.js');

let auth = jwt({
    secret: config.secret,
    userProperty: 'payload'
});

module.exports = function (app) {

    let customerOperations = require('../controllers/customerController');
    let advisorOperations = require('../controllers/advisorController');

    let authentication = require('../controllers/authentication');
    let profile = require('../controllers/profile');

    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401);
            res.json({"message": err.name + ": " + err.message});
        }
    });

    /*CUSTOMER ROUTES*/
    app.route('/customer')
        .get(auth, customerOperations.list_all_customers)
        .post(auth, customerOperations.create_a_customer);

    app.route('/customer/:customerId')
        .get(auth, customerOperations.get_customer)
        .put(auth, customerOperations.update_customer)
        .delete(auth, customerOperations.delete_customer);

    /*ADVISOR ROUTES*/
    app.route('/register')
        .post(authentication.register);

    app.route('/login')
        .post(authentication.login);

    app.route('/profile')
        .get(profile.profile_read);

    /*BANK ACCOUNT ROUTES*/
    app.route('/account/:customerId')
        .put(auth, customerOperations.insert_new_account)
        .get(auth, customerOperations.get_accounts);

    /*MOVEMENTS ACCOUNT ROUTES*/
    app.route('/movement/:customerId')
        .get(auth, customerOperations.get_total_movements)
        .put(auth, customerOperations.insert_movement_to_account);

    /*INVESTMENT ACCOUNT ROUTES*/
    app.route('/investment/:customerId')
        .put(auth, customerOperations.insert_investment_products);

    /**ADVISOR ROUTES**/
    app.route('/customerbyadvisor/:advisorId')
        .get(auth, advisorOperations.list_all_customers_by_advisor);

    app.route('/advisor/:advisorId')
        .get(auth, advisorOperations.get_advisor);

    app.route('/advisor')
        .get(auth, advisorOperations.list_all_advisor);

    /*PRODUCTS ACCOUNT ROUTES*/
    app.route('/task/:customerId')
        .put(auth, advisorOperations.create_customer_task);

    /*PRODUCTS ACCOUNT ROUTES*/
    app.route('/product/:customerId')
        .put(auth, advisorOperations.profile_customer_products);

    app.route('/', function (req, res) {
        res.json({message: 'Welcome to the coolest API!'});
    });
};
