const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String,
        default: ''
    },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
                      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
                      .toString('hex');
};

userSchema.methods.isValidPassword = function (password) {
    const hash = crypto
                       .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
                       .toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000, 10),
    }, process.env.JWT_SECRET);
};

mongoose.model('User', userSchema, 'Users');