<template>
  <b-container>
    <post-card 
      
      v-for="post in posts"
      :key="post._id"
      :id="post._id"
      :title="post.title"
      :author="post.author"
      :content="post.content"
      :last_edit="post.last_edit"
      :is_home_view="true"
      />
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

  data() {
    return { posts: [] };
  },

  methods: {
    async fetchData() {
      fetch("http://localhost:3000/api/posts")
        .then((res) => res.json())
        .then((data) => {this.posts = data; console.log(data)})
        .catch((err)=>console.log(err));
    }
  }
};
</script>
