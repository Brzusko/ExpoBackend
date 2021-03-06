const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/', (req, res) => {
   console.log('Incoming request');
   res.send('Auth Server');
});

router.post('/loginCred', authController.loginWithCredentials);
router.post('/loginRef', authController.loginWithRefreshToken);
router.post('/logout', authController.logout);

module.exports = router;
