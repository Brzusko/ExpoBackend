const express = require('express');
const accountRepoClass = require('../repos/accountRepo');
const router = express.Router();
const accountRepo = new accountRepoClass();

router.get('/', async (req, res) => {
    await accountRepo.Create('zulek', 3030);
    res.send('Andrzej');
});

module.exports = router;