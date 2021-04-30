const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {
        type: String,
        maxLength: 32
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    content: String
});

mongoose.model('Comment', commentSchema, 'Comments');