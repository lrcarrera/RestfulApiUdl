'use strict';

const util = require('util')
var mongoose = require('mongoose'),
    Customer = mongoose.model('Customer'),
    User = mongoose.model('User');


exports.list_all_customers_by_advisor = function(req, res) {

    Customer.find({ advisor: req.params.advisorId}, function(err, customers) {
        if (err)
            res.send(err);
        res.json(customers);
    });
};

exports.get_advisor = function(req, res) {

    User.find({'_id': ObjectId(req.params.advisorId)}, function(err, advisor) {
        if (err)
            res.send(err);
        res.json(advisor);
    });
};


