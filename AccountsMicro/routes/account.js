const express = require('express');
const router = express.Router();

const accountController = require('../controllers/account');

router.post('/create', accountController.registerNewAccount);

module.exports = router;