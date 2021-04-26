const express = require('express');
const router = express.Router();
const ctrlApi = require('../controllers/api');
const ctrlAuth = require('../controllers/auth');

/* GET home page. */
router.get('/test', ctrlApi.test);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
module.exports = router;
