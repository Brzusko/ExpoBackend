require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const accountRoute = require('./routes/account');
const uri = process.env.DB_ADDRESS;

app.use(bodyParser.json());
app.use('/accounts', accountRoute);

app.listen(process.env.PORT || 3030, () => {
    console.log("Starting web server");
});

mongoose.connect(uri, {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD
});