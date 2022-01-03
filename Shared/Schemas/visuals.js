const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const visualsSchema = new Schema({
    color: {
        type: String,
    },
    sex: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    head: {
        type: String,
    },
    face: {
        type: String,
    },
    body: {
        type: String,
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    }
});

const visualsModel = new model('Visuals', visualsSchema);

module.exports = visualsModel;