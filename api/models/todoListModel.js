'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

/*var CustomerSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  money: {
    type: String,
    required: '0'
  },
  risk_money_laundering: {
    type: [{
      type: String,
      enum: ['low', 'medium', 'high']
    }],
    default: ['medium']
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});*/

module.exports = mongoose.model('Tasks', TaskSchema);
//module.exports = mongoose.model('Customer', CustomerSchema);
