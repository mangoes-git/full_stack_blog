<template>
  <div id="app">
    <b-container>
      <NavBar />

      <Post />
      <Post />
      <Post />
      <Post />
    </b-container>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Post from "./components/Post.vue";
export default {
  name: "App",
  components: {
    NavBar,
    Post,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
