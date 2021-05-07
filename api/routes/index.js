const express = require('express');
const router = express.Router();
const ctrlApi = require('../controllers/api');
const ctrlAuth = require('../controllers/auth');
const ctrlPost = require('../controllers/post');

/* GET home page. */
router.get('/test', ctrlApi.test);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.route('/posts')
      .get(ctrlPost.getPosts)
      .post(ctrlPost.createPost);

router.route('/posts/author/:user_id')
      .get(ctrlPost.getPostsByUser);

module.exports = router;
