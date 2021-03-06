'use strict';

let mongoose = require('mongoose'),
    Customer = mongoose.model('Customer'),
    User = mongoose.model('User');

exports.list_all_customers = function (req, res) {
    Customer.find({}, function (err, customer) {
        if (err)
            res.send(err);
        res.json(customer);
    });
};

exports.create_a_customer = function (req, res) {

    User.findById(req.body.advisor, function (err, advisor) {
        if (err)
            res.send(err);

        req.body.customer.advisor = advisor;

        let new_customer = new Customer(req.body.customer);
        new_customer.save(function (err, customer) {
            if (err)
                res.send(err);

            res.json(customer);
        });
    });
};

exports.get_customer = function (req, res) {
    Customer.findOne({dni: req.params.customerId}, function (err, customer) {
        if (err)
            res.send(err);
        res.json(customer);
    });
};

exports.update_customer = function (req, res) {
    req.body.customer.customer_info.last_modification_date = Date.now();
    Customer.findOneAndUpdate({dni: req.params.customerId}, {$set: req.body.customer}, {new: true}, function (err, customer) {
        if (err)
            res.send(err);

        res.json(customer);
    });
};

exports.delete_customer = function (req, res) {
    Customer.remove({
        dni: req.params.customerId
    }, function (err, customer) {
        if (err)
            res.send(err);
        res.json(customer);
    });
};

exports.insert_investment_products = function (req, res) {
    console.log(JSON.stringify(req.body.investment_products));

    Customer.findOneAndUpdate({dni: req.params.customerId},
        {
            $set: {
                investment_products: {
                    economical_group: {
                        tasks: req.body.economicalGroupTasks,
                        campaigns: req.body.economicalGroupCampaigns,
                        documents: req.body.economicalGroupDocuments
                    },
                    familiar_group: {
                        tasks: req.body.familiarGroupTasks,
                        campaigns: req.body.familiarGroupCampaigns,
                        documents: req.body.familiarGroupDocuments
                    }
                }
            }
        },
        {new: true},

        function (err, customer) {
            if (err)
                res.send(err);
            res.json(customer);
        });
};

exports.insert_new_account = function (req, res) {
    let account = {
        iban: req.body.iban,
        total_amount: req.body.total_amount,
        account_name: req.body.account_name,
        movements: req.body.movements
    };

    Customer.findOneAndUpdate({dni: req.params.customerId},
        {$set: {last_modification_date: Date.now()}, $push: {accounts: account}},
        {new: true},

        function (err, customer) {
            if (err)
                res.send(err);
            res.json(customer);
        });
};

exports.get_accounts = function (req, res) {
    Customer.findOne({dni: req.params.customerId}, function (err, customer) {

        if (err)
            res.send(err);
        res.json(customer.accounts);
    });
};

exports.insert_movement_to_account = function (req, res) {
    Customer.findOne({dni: req.params.customerId}, function (err, customer) {
        if (err)
            res.send(err);
        for (let i = 0; i < customer.accounts.length; i++) {
            if (customer.accounts[i].iban === req.body.account_iban) {
                req.body.movement.movement_date = Date.now();
                customer.accounts[i].movements.push(req.body.movement);
            }
        }
        console.log(customer.accounts);

        Customer.findOneAndUpdate({dni: req.params.customerId}, customer, {upsert: true}, function (err, customer) {
            if (err) return res.send(500, {error: err});
            return res.json(customer);

        });
    });
};


exports.get_total_movements = function (req, res) {
    Customer.findOne({dni: req.params.customerId}, function (err, customer) {

        if (err)
            res.send(err);

        let response = [];
        customer.accounts.forEach((account) => {

            let account_name_aux = account.account_name
                .split(/\s/)
                .reduce((response, word) => response += word
                    .slice(0, 1), '')
                .toUpperCase();

            let total_movements_aux = Math.round(account.movements
                .filter(movement => movement.movement_date.getMonth() + 1 === new Date().getMonth() + 1)
                .reduce((total, movement) => total + parseFloat(movement.amount), 0) * 100) / 100;


            response.push({
                account_name: account_name_aux,
                total_movements: total_movements_aux
            });
        });
        res.json(response);
    });
};

