const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

const queryUser = (username, next) => {
    let query = User
                    .findOne({ username: username })
                    .select('-salt -hash');
    query.exec(next);
}

const getLoggedUser = (req, res) => {
    jwt.verify(req.cookies.jwt,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err) res.status(400).json(err);

            queryUser(decoded.username,(err, user) => {
                if (err) res.status(400).json(err);

                res
                    .status(200)
                    .json(user);
            });
        }
    );
}

const getUser = (req, res) => {
    const username = req.params.username;
    console.log(req.params);
    queryUser(username, (err, user) => {
        if (err) res.status(400).json(err);

        if (user) {
            res
               .status(200)
               .json(user);
        } else {
            res
               .status(404)
               .json({'message': 'User not found'});
        }
    });
}
module.exports = {
    getLoggedUser,
    getUser,
}