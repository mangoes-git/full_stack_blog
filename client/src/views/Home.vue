<template>
  <b-container>
    <post-card/>
  </b-container>
</template>

<script>
import Post from '../components/Post.vue';
export default {
  name: "home",
  components: {
    "post-card": Post,
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      const res = await fetch("localhost:3000/api/posts");
      const posts = await res.json();
      console.log(posts);
    }
  }
};
</script>
