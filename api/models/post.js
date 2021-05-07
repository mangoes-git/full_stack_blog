const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        maxLength: 32
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    last_edit: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        maxLength: 255
    },
    content: String,
    comments: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'} ]
});

mongoose.model('Post', postSchema, 'Posts');