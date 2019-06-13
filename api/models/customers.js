const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Office = require('./offices');

const CustomerSchema = new Schema({

    dni: {
        type: String,
        unique: true,
        required: 'Mandatory DNI not introduced'
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
            enum: Office.office_names
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
                type: Number,
                default: 0
            },
            campaigns: {
                type: Number,
                default: 0
            },
            documents: {
                type: Number,
                default: 0
            }
        },
        economical_group: {
            tasks: {
                type: Number,
                default: 0
            },
            campaigns: {
                type: Number,
                default: 0
            },
            documents: {
                type: Number,
                default: 0
            }
        },
    }
});

module.exports = mongoose.model('Customer', CustomerSchema);
