<template>
  <b-container>
    <post-card :is-home-view="false"/>
    <!-- get post id somehow so we can query the api-->
  </b-container>
</template>

<script>
import Post from '../components/Post.vue';
export default {
  name: "post-comments",
  props: [
    "id",
    ],
  components: {
    "post-card": Post,
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
      fetch(`http://localhost:3000/api/posts/${this.id}/comments`)
        .then((res) => res.json())
        .then((data) => {console.log(data)})
        .catch((err)=>console.log(err));
    }
  }
};
</script>
