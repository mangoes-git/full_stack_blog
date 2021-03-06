const { json } = require('express');
const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const Post = mongoose.model('Post')

const getPostComments = (req, res) => {
    const postId = req.params.post_id;
    let query = Post.findById(postId)
                    .populate('comments')
                    .select('comments');

    query.exec((err, post) => {
        if (err) res.status(400).json(err);
        
        if (post) {
            res
                .status(200)
                .json({comments: post.comments});
        } else {
            res.status(404);

        }
    });
};

const addCommentToPost = (req, res, post) => {
    let newComment = new Comment();
    newComment.author = req.body.author;
    newComment.content = req.body.content;

    // TODO: see what we can do about the callback hell here...
    newComment.save((err, comment) => {
        if (err) res.status(400).json(err);
        post.comments.push(newComment._id);
        post.save((err, post) => {
            if (err) res.status(400).json(err);

            res
               .status(201)
               .json(comment);
        });
    });
  
};

const createComment = (req, res) => {
    const postId = req.params.post_id;

    let query = Post.findById(postId);
    query.exec((err, post) => {
        if (err) res.status(400).json(err);

        if (post) {
            addCommentToPost(req, res, post);
        } else {
            res
               .status(404)
               .json({'error': 'Post not found'});
        }
    });
};

const getCommentById = (req, res) => {
    const postId = req.params.post_id;
    const commentId = req.params.comment_id;

    let query = Post.findById(postId).select('comments').populate('comments');
    query.exec((err, doc) => {
        if (err) res.status(400).json(err);
        let comment = doc.comments.find((element) => element._id == commentId)

        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({'error': 'Comment does not exist'});
        }
    })
};

const updateComment = (req, res) => {
    const commentId = req.params.comment_id;
    const newContent = req.body.content;

    Comment.findByIdAndUpdate(
        commentId,
        {
            content: newContent,
            last_edit: Date.now()
        },
        (err, comment) => {
            if (err) res.status(400).json(err);

            res
               .status(204)
               .send();
        });
};

module.exports = {
    getPostComments,
    getCommentById,
    createComment,
    updateComment,
}