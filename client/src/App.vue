<template>
  <div id="app">
    <NavBar />
    <b-container>
      <b-row>
        <b-col>1 of 3</b-col>
        <b-col>2 of 3</b-col>
        <b-col>3 of 3</b-col>
      </b-row>
    </b-container>
    <Post />
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
