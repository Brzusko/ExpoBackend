const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/', (req, res) =>{
   res.send('Auth Server');
});

router.post('/loginCred', authController.loginWithCredentials);
router.post('/loginRef', authController.loginWithRefreshToken);

module.exports = router;
