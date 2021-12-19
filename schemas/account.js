const mongoose = require("mongoose");
const { Schema, Model } = mongoose;

const account = new Schema({
    _id: Schema.Types.ObjectId,
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
        required: true,
        min: 0,
        max: 2
    }
});

const accountModel = new Model('Account', account);

module.exports = accountModel;

