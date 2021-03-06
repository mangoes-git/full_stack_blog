const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const register = (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        return res
                  .status(400)
                  .json({ "message": "All fields required", "req":req.body});
    }

    const user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save((err) => {
        if (err) {
            res
               .status(404)
               .json(err);
        } else {
            const token = user.generateJwt();
            res
               .status(200)
               .cookie('jwt', token, { httpOnly: true })
               .json({token});
        }
    });
};

const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res
                  .status(400)
                  .json({ "message": "All fields required" });
    }

    passport.authenticate('local', (err, user, info) => {
        let token;
        if (err) {
            return res
                      .status(404)
                      .json(err);
        }

        if (user) {
            token = user.generateJwt();
            res
               .status(200)
               .cookie('jwt', token, { httpOnly: true })
               .json({token});
        } else {
            res
               .status(401)
               .json(info);
        }
    }) (req, res);
};

module.exports = {
    register,
    login
}