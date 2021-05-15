<template>
  
  <div>
    <post-modal/>
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
  </div>
</template>

<script>
import Post from '../components/Post.vue';
import CreatePost from '../components/CreatePost.vue';
export default {
  name: "home",
  components: {
    "post-card": Post,
    "post-modal": CreatePost,
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
