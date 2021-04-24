const express = require('express');
const router = express.Router();
const ctrlApi = require('../controllers/api');

/* GET home page. */
router.get('/test', ctrlApi.test);

module.exports = router;
