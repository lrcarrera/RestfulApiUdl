'use strict';

var mongoose = require('mongoose'), Customer = mongoose.model('Customer');

exports.list_all_customers = function(req, res) {
  Customer.find({}, function(err, customer) {
    if (err)
      res.send(err);
    res.json(customer);
  });
};

/*exports.test = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json({'message': 'Hello World :)'});
  });
};*/

exports.create_a_customer = function(req, res) {
  console.log(req.body);
  //console.log(req.body.Customer_Dni);
//Repair API insert customers correctly and check in db if its insert correctly
  var new_customer = new Customer(req.body);
  new_customer.save(function(err, customer) {
    if (err)
      res.send(err);
    res.json(customer);
  });
};
//TODO: Ready to be tested, how to pass dni by parameter instead of unique default identifier
exports.get_customer = function(req, res) {
    console.log(req.body);
  console.log(req.body.dni);
    console.log(req.params);
  Customer.findOne({dni: req.params.dni}, function (error, customer) {
    if (err)
      res.send(err);
    res.json(customer);
  });
};

exports.update_customer = function(req, res) {
  Customer.findOneAndUpdate({dni: req.params.dni}, req.body, {new: true}, function(err, customer) {
    if (err)
      res.send(err);
    res.json(customer);
  });
};

exports.delete_customer = function(req, res) {
  Customer.remove({
    dni: req.params.dni
  }, function(err, customer) {
    if (err)
      res.send(err);
    res.json({ message: 'Customer successfully deleted' });
  });
};
