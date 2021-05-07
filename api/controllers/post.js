const mongoose = require('mongoose');
const Post = mongoose.model('Post');

const createPost = (req, res) => {
    if (!req.body.title) {
        res
           .status(400)
           .json({'error': 'Post must have a title'});
    }

    if (!req.body.author) {
        res
           .status(400)
           .json({'error': 'Post must have an author'})
    }
    
    const post = new Post();
    post.title = req.body.title;
    post.author = req.body.author;
    post.content = req.body.content;
    post.save((err) => {
        if (err) {
            res
               .status(500)
               .json(err);
        } else {
            res
               .status(201)
               .json(req.body);
        }
    });
};

const getPosts = (req, res) => {
    sortBy = req.query.sortby ? req.query.sortby : 'creation_date'

    if (sortBy != 'creation_date' && sortBy != 'last_edit') {
        res
           .status(400)
           .json({ 'error': 'invalid query param "sortby"', sortBy});
    }

    let query = Post.find({}).sort(`-${sortBy}`);
    query.exec((err, docs) => {
        if (err) res.status(400).json(err);
        res
           .status(200)
           .json(docs);
    });
};


const getPostsByUser = (req, res) => {
    sortBy = req.query.sortby ? req.query.sortby : 'creation_date'

    if (sortBy != 'creation_date' && sortBy != 'last_edit') {
        res
           .status(400)
           .json({ 'error': 'invalid query param "sortby"', sortBy});
    }

    let query = Post.find({'author': req.params.user_id}).sort(`-${sortBy}`);
    query.exec((err, docs) => {
        if (err) res.status(400).json(err);
        res
           .status(200)
           .json(docs);
    });
};

module.exports = {
    createPost,
    getPosts,
    getPostsByUser,
}