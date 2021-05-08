const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const Post = mongoose.model('Post')

const getPostComments = (req, res) => {
    const postId = req.params.post_id;
    let query = Post.findById(postId)
                    .populate('comments')
                    .select('comments');

    query.exec((err, comments) => {
        if (err) res.status(400).json(err);

        res
           .status(200)
           .json(comments);
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
            
            let newComment = post.comments[post.comments.length - 1];
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

module.exports = {
    getPostComments,
    createComment,
}