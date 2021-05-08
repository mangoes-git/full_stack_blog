const express = require('express');
const router = express.Router();
const ctrlApi = require('../controllers/api');
const ctrlAuth = require('../controllers/auth');
const ctrlComment = require('../controllers/comment');
const ctrlPost = require('../controllers/post');

/* GET home page. */
router.get('/test', ctrlApi.test);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.route('/posts')
      .get(ctrlPost.getPosts)
      .post(ctrlPost.createPost);

router.route('/posts/:post_id')
      .get(ctrlPost.getPostById)
      .put(ctrlPost.updatePost);

router.route('/posts/:post_id/comments')
      .get(ctrlComment.getPostComments)
      .post(ctrlComment.createComment);

router.route('/posts/author/:user_id')
      .get(ctrlPost.getPostsByUser);

module.exports = router;
