const { Schema, model } = require('mongoose');

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['access', 'refresh']
    },
    account: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Account',
    }
});

const tokenModel = new model('Token', tokenSchema);

module.exports = tokenModel;