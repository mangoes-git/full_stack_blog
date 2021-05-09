const express = require('express');
const router = express.Router();
const ctrlApi = require('../controllers/api');
const ctrlAuth = require('../controllers/auth');
const ctrlComment = require('../controllers/comment');
const ctrlPost = require('../controllers/post');
const ctrlUser = require('../controllers/user');

const jwt = require('express-jwt');
const auth = jwt({
      secret: process.env.JWT_SECRET,
      // userProperty: 'payload',
      getToken: (req) => {
            if (req.headers.authorization
                  && req.headers.authorization.split(' ')[0] === 'Bearer'
            ) {
                  return req.headers.authorization.split(' ')[1];
            } else if (req.cookies.jwt) {
                  return req.cookies.jwt;
            }
            return null;
      },
      algorithms: ['HS256']
});

/* GET home page. */
router.get('/test', ctrlApi.test);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.get('/user/info', auth, ctrlUser.getUserInfo);

router.route('/posts')
      .get(ctrlPost.getPosts)
      .post(ctrlPost.createPost);

router.route('/posts/:post_id')
      .get(ctrlPost.getPostById)
      .put(ctrlPost.updatePost);

router.route('/posts/author/:user_id')
      .get(ctrlPost.getPostsByUser);

router.route('/posts/:post_id/comments')
      .get(ctrlComment.getPostComments)
      .post(ctrlComment.createComment);

router.route('/posts/:post_id/comments/:comment_id')
      .get(ctrlComment.getCommentById)
      .put(ctrlComment.updateComment);


module.exports = router;
