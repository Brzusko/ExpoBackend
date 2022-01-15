const express = require('express');
const accessMiddleware = require('../middleware/accessGuard');
const accountController = require('../controllers/account');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('Incoming request');
    res.send('Accounts Service');
});

router.post('/create', accountController.registerNewAccount);
router.post('/get', accessMiddleware(0), accountController.getAccountDetails);

module.exports = router;