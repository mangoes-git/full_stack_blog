const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    // userProperty: 'payload',
    getToken: (req) => {
        if (req.headers.authorization 
            && req.headers.authorization.split(' ')[0] === 'Bearer'
            ) {
            return req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            return req.cookies.jwt;
        }
        return null;
    },
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
