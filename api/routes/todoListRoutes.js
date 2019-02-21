'use strict';
var jwt = require('express-jwt');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

module.exports = function(app) {

  var todoList = require('../controllers/todoListController');
  var authentication = require('../controllers/authentication');
  var profile = require('../controllers/profile');


  // todoList Routes
  /*Add the route like below to restrict access
    router.get('/profile', auth, ctrlProfile.profileRead);
  */
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);

  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);

  app.route('/register')
    .post(authentication.register);

  app.route('/login')
    .post(authentication.login);
//PENDING TO TEST AND RESOLVE THAT ROUTE
  app.route('/profile/:userId')
    .get(profile.profileRead);

/*
  app.route('/customers')
    .get(todoList.list_all_customers)
    .post(todoList.create_a_customer);*/
};
