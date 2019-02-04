'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');
//  Customer = mongoose.model('Customer');

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

/*exports.list_all_customers = function(req, res) {
  Customer.find({}, function(err, customer) {
    if (err)
      res.send(err);
    res.json(customer);
  });
};*/

exports.test = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json({'message': 'Hello World :)'});
  });
};




exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

/*exports.create_a_customer = function(req, res) {
  var new_customer = new Customer(req.body);
  new_customer.save(function(err, customer) {
    if (err)
      res.send(err);
    res.json(customer);
  });
};*/


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
