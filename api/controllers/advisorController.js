'use strict';

const util = require('util')
var mongoose = require('mongoose'),
    Customer = mongoose.model('Customer'),
    User = mongoose.model('User');


exports.list_all_customers_by_advisor = function(req, res) {

    Customer.find({ advisor: req.params.advisorId}, function(err, customer) {
        if (err)
            res.send(err);
        res.json(customer);
    });
};


