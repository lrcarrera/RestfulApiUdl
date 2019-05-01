'use strict';
const util = require('util')
var mongoose = require('mongoose'),
    Customer = mongoose.model('Customer');

exports.list_all_customers = function(req, res) {
    console.log("entro listall");
    console.log(req.params);;

    Customer.find({}, function(err, customer) {
        if (err)
            res.send(err);
        res.json(customer);
    });
};

exports.create_a_customer = function(req, res) {
    var new_customer = new Customer(req.body);
    new_customer.save(function(err, customer) {
        if (err)
            res.send(err);
        res.json(customer);
    });
};

exports.get_customer = function(req, res) {
    Customer.findOne({ dni: req.params.customerId }, function (err, customer) {
        if (err)
            res.send(err);
        res.json(customer);
    });
};

exports.update_customer = function(req, res) {
    req.body.last_modification_date = Date.now();
    Customer.findOneAndUpdate({dni: req.params.customerId}, {$set: req.body}, {new: true}, function(err, customer) {
        if (err)
            res.send(err);
        res.json(customer);
    });
};

exports.delete_customer = function(req, res) {
    Customer.remove({
        dni: req.params.customerId
    }, function(err, customer) {
        if (err)
            res.send(err);
        res.json({ message: 'Customer successfully deleted' });
    });
};

exports.insert_new_account = function(req, res) {
    var account = {
        iban : req.body.iban,
        total_amount : req.body.total_amount,
        account_name : req.body.account_name,
        movements : req.body.movements
    };

    Customer.findOneAndUpdate({ dni : req.params.customerId },
        {$set: {last_modification_date : Date.now()} , $push: { accounts : account } },
        {new:true},

        function(err, customer) {
            if (err)
                res.send(err);
            res.json(customer);
        });
};

exports.get_accounts = function(req, res) {
    Customer.findOne({ dni: req.params.customerId }, function (err, customer) {

        if (err)
            res.send(err);
        res.json(customer.accounts);
    });
};

exports.get_total_movements = function(req, res) {
    Customer.findOne({ dni: req.params.customerId }, function (err, customer) {

        if (err)
            res.send(err);

        // let customerAccounts = res.json();
        let response = [];

        customer.accounts.forEach((account) => {

            response.push({
                account_name : account.account_name,
                total_movements : account.movements.reduce((total, movement) => total + parseFloat(movement.amount))
            });
        });

        res.json(response);
    });
};

