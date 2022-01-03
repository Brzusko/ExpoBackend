const express = require('express');
const accessMiddleware = require('../middleware/accessGuard');
const accountController = require('../controllers/account');
const router = express.Router();

router.post('/create', accountController.registerNewAccount);
router.post('/get', accessMiddleware(0), accountController.getAccountDetails);

module.exports = router;