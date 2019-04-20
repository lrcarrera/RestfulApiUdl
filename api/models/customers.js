var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
//todoListModel
/*var CustomerSchema = new Schema({
name: {
type: String,
required: 'Kindly enter the name of the customer'
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
},
risk_money_laundering: {
type: [{
type: String,
enum: ['low', 'medium', 'high']
}],
default: ['medium']
},
email: {
type: String,
default: 'no'
},
number: {
type: String,
required: 'Kindly enter the phone number of customer'
}
});
*/
var CustomerSchema = new Schema({

  dni: {
    type: String,
    unique: true,
    required: 'Kindly enter dni please'
  },
  customer_info: {
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    current_address: {
      type: String,
    },
    email_address: {
      type: String,
    },
    risk_money_laundering: {
      type: [{
        type: String,
        enum: ['low', 'medium', 'high']
      }],
      default: ['medium']
    },
    last_modification_date: {
      type: Date,
      default: Date.now
    },
  },
  phone: {
    type: String,
  },
  accounts: [{
    iban: {
      type: String
    },
    total_amount: {
      type: String
    },
    account_name: {
      type: String
    },
    movements: [{
      description: {
        type: String
      },
      amount: {
        type: String
      }
    }]
  }],
  advisor: { type: Schema.Types.ObjectId, ref: 'User' },
  derivative_products: [{name: String}],
  investment_products: [{name: String}]
});
/*
// Getter
CustomerSchema.path('money').get(function(num) {
return (num / 100).toFixed(2);
});

// Setter
CustomerSchema.path('money').set(function(num) {
return num * 100;
});
*/
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

module.exports = mongoose.model('Customer', CustomerSchema);
//module.exports = mongoose.model('Customer', CustomerSchema);
