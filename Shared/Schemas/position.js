const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const positionSchema = new Schema({
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
    z: {
        type: Number,
        required: true,
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
});

const positionModel = new model('Position', positionSchema);

module.exports = positionModel;
