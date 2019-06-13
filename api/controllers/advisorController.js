'use strict';
const mongoose = require('mongoose'),
    Customer = mongoose.model('Customer'),
    User = mongoose.model('User');

const Role = require('../models/roles');


exports.list_all_customers_by_advisor = function (req, res) {

    Customer.find({advisor: req.params.advisorId}, function (err, customers) {
        if (err)
            res.send(err);
        res.json(customers);
    });
};

exports.get_advisor = function (req, res) {

    User.findById(req.params.advisorId, function (err, advisor) {
        if (err)
            res.send(err);
        res.json(advisor);
    });
};

exports.list_all_advisor = function (req, res) {

    User.find({role: {"$ne": Role.Admin}}, '-hash -salt -__v', function (err, advisor) {
        console.log(advisor);
        if (err)
            res.send(err);
        res.json(advisor);
    });
};


exports.profile_customer_products = function (req, res) {

    Customer.findOneAndUpdate({dni: req.params.customerId},
        {$set: {last_modification_date: Date.now(), derivative_products: req.body.profile}}, {new: true},
        function (err, customer) {
            if (err)
                res.send(err);
            res.json(customer);
        });
};

exports.create_customer_task = function (req, res) {

    let typeOfTask = '', incrementTask = '';

    if (req.body && req.body.economical_group) {
        if (req.body.economical_group.documents)
            incrementTask = 'documents';
        if (req.body.economical_group.campaigns)
            incrementTask = 'campaigns';
        if (req.body.economical_group.tasks)
            incrementTask = 'tasks';
        typeOfTask = 'investment_products.economical_group.' + incrementTask;
    } else {
        if (req.body.familiar_group.documents)
            incrementTask = 'documents';
        if (req.body.familiar_group.campaigns)
            incrementTask = 'campaigns';
        if (req.body.familiar_group.tasks)
            incrementTask = 'tasks';
        typeOfTask = 'investment_products.familiar_group.' + incrementTask;
    }
    Customer.findOneAndUpdate({dni: req.params.customerId},
        {$set: {last_modification_date: Date.now()}, $inc: {[typeOfTask]: 1}}, {new: true},
        function (err, customer) {
            console.log(customer);
            if (err)
                res.send(err);
            res.json(customer);
        });
};


