# README


## Introduction
This is a full stack web application for a simple blog service developed following best practices. This project is intended to be a proof of knowledge rather than to be a usable product.


The backend consists of a RESTful API on a MongoDB NoSQL database. Authentication is implemented using JWT.

The frontend is a responsive Vue.js Single Page Application.

## Technologies

This project uses a MEVN stack (Mongo, Express, Vue.js, Node.js). The following libraries are used:

  * Backend:
    * Express for routing.
    * Mongoose for data modelling and database interaction.
    * Passport.js for authentication handling with JWT.
    * JSONWebToken for stateless authentication.

  * Frontend:
    * Vue.js
    * vue-router
    * bootstrap-vue

## API

  * ``/api/login``:
    * ``POST``: Returns a JWT if given valid credentials.
  
  * ``/api/register``:
    * ``POST``: Register a new user.
  
  * ``/api/user``:
    * ``GET``: Returns the profile information about the current logged-in user.
  
  * ``/api/user/:username``:
    * ``GET``: Returns the profile information of ``:username``

  * ``/api/posts``:
    * ``GET``: Returns a list of all posts, sorted by creation date.
    * ``POST``: Creates a new post if logged in.

  * ``/api/posts/:post_id``:
    * ``GET``: Returns the post information of the given ``:postid``.
    * ``PUT``: Updates the post content.

  * ``posts/:post_id/comments``:
    * ``GET``: Returns the comments from a given post.
    * ``POST``: Creates a new comment on the given post.

  * ``posts/author/:username``:
    * ``GET``: Returns the posts created by ``:username``.

  * ``posts/:post_id/comments/:comment_id``:
    * ``GET``: Returns the information of the given comment.
    * ``PUT``: Updates the content of the given comment.


## Schemas

### User

```
{
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
}
```

### Post
```
{
    author: {
        type: User,
        required: True
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
}
```

### Comment
```
{
    author: {
        type: User,
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    last_edit: {
        type: Date,
        default: Date.now
    },
    content: String
}
```

## TODO
  * Add pagination.
  * Add user avatars.
  * Implement voting system on comments.
  * Deploy on Heroku.