const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const account = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'Username is to short.'],
        maxlength: [30, 'Username is to long']
    },
    pinCode: {
        type: Number,
        required: true,
        min: 1000,
        max: 9999
    },
    power: {
        type: Number,
    }
});

account.pre('save', function(next) {
    this.power = 0;
    next();
});

const accountModel = new model('Account', account);

module.exports = accountModel;

