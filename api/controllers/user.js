const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

const getUserInfo = (req, res) => {
    jwt.verify(req.cookies.jwt,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err) res.status(400).json(err);

            let query = User
                            .findOne({ username: decoded.username })
                            .select('-salt -hash');
            query.exec((err, user) => {
                if (err) res.status(400).json(err);

                res
                   .status(200)
                   .json(user);
            })
        }
    );
}

module.exports = {
    getUserInfo,
}