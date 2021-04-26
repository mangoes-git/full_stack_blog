const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    // userProperty: 'payload',
    algorithms: ['HS256']
})
const ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.index);

router
    .route('/auth_test')
    .get(auth, (req, res) => {
        res.json({ "message": "access granted"});
    })
module.exports = router;
