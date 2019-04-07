'use strict';

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
    console.log("chill");
    console.log(customer);

    if (err)
      res.send(err);
    res.json(customer);
  });
  };

exports.update_customer = function(req, res) {
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
