'use strict';

const util = require('util')
const mongoose = require('mongoose'),
    Customer = mongoose.model('Customer'),
    User = mongoose.model('User');

const Role = require('../models/roles');


exports.list_all_customers_by_advisor = function(req, res) {

    Customer.find({ advisor: req.params.advisorId}, function(err, customers) {
        if (err)
            res.send(err);
        res.json(customers);
    });
};

exports.get_advisor = function(req, res) {

    User.findById(req.params.advisorId, function(err, advisor) {
        if (err)
            res.send(err);
        res.json(advisor);
    });
};

exports.list_all_advisor = function(req, res) {


    User.find({ role: { "$ne": Role.Admin }}, '-hash -salt', function(err, advisor) {
        console.log(advisor);
        if (err)
            res.send(err);
        res.json(advisor);
    });
};


