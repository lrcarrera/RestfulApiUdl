var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
            },
            movement_date: {
                type: Date,
                default: Date.now
            }
        }]
    }],
    advisor: {type: Schema.Types.ObjectId, ref: 'User'},
    assigned_office: {
        type: [{
            type: String,
            enum: [
                'B. PRIVADA BARCELONA CENTRO',
                'B. PRIVADA BARCELONA NORTE',
                'B. PRIVADA MADRID CENTRO',
                'B. PRIVADA MADRID NORTE',
                'B. PRIVADA VALENCIA',
                'B. PRIVADA ZARAGOZA',
                'B. PUBLICA BARCELONA CENTRO',
                'B. PUBLICA MADRID CENTRO',
                'B. PUBLICA VALENCIA',
                'B. PUBLICA ZARAGOZA'
            ]
        }],
        default: ['B. PUBLICA MADRID CENTRO']
    },
    derivative_products: {
        product1: {type: Boolean, default: false},
        product2: {type: Boolean, default: false},
        product3: {type: Boolean, default: false},
        product4: {type: Boolean, default: false},
        product5: {type: Boolean, default: false}
    },
    investment_products: {
        familiar_group: {
            tasks: {
                type: Number
            },
            campaigns: {
                type: Number
            },
            documents: {
                type: Number
            }
        },
        economical_group: {
            tasks: {
                type: Number
            },
            campaigns: {
                type: Number
            },
            documents: {
                type: Number
            }
        },
    }
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
