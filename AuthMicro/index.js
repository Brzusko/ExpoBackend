require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const authRoute = require('./routes/login');
const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoute);

app.listen(process.env.PORT, () => {
    console.log('Starting Auth Service');
});

mongoose.connect(process.env.DB_ADDRESS, {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD
});