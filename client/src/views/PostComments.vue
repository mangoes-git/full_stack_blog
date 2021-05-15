<template>
  <b-container>
    <post-card 
      :id="this.post._id"
      :title="this.post.title"
      :author="this.post.author"
      :content="this.post.content"
      :last_edit="this.post.last_edit"
      :is-home-view="false"/>
      
    <b-container id="comments-container">
      <b-row class="mt-3">
       <h2> Comments </h2>
      </b-row>
    </b-container>
    <comment-card
      v-for="comment in comments"
      :key="comment._id"

      :id="comment._id"
      :author="comment.author"
      :content="comment.content"
      :last_edit="comment.last_edit"
      />
  </b-container>
</template>

<script>
import Comment from '../components/Comment.vue';
import Post from '../components/Post.vue';
export default {
  name: "post-comments",
  props: [
    "post_id",
    ],
  components: {
    "post-card": Post,
    "comment-card": Comment,
  },

  mounted() {
    this.fetchData();
  },

  data() {
    return {
      post: {},
      comments: []
    };
  },

  methods: {
    async fetchData() {
      this.fetchPostData();
      this.fetchComments();
    },
    async fetchPostData() {
      fetch(`http://localhost:3000/api/posts/${this.post_id}`)
        .then((res) => res.json())
        .then((data) => {this.post = data})
        .catch((err)=>console.log(err));
    },
    async fetchComments() {
      fetch(`http://localhost:3000/api/posts/${this.post_id}/comments`)
        .then((res) => res.json())
        .then((data) => {this.comments = data.comments})
        .catch((err)=>console.log(err));
    }
  }
};
</script>

<style scoped>
  #comments-container {
    max-width: 60%;
    margin-bottom: 5%;
  }
</style>