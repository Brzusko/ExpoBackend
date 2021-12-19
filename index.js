require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const uri = process.env.DB_ADDRESS;

app.listen(process.env.PORT || 3030, () => {
    console.log("Starting web server");
});

mongoose.connect(uri, {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD
}).then(() => {
    console.log('Connected');
}).catch(err => {
    console.log(err);
});