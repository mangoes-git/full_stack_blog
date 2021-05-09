<template>
  <b-container>
    <!-- add profile information -->
  </b-container>
</template>

<script>
export default {
  name: "profile",
  components: {
  },

  mounted() {
    this.fetchData();
  },

  data() {
    return { info: {} };
  },

  methods: {
    async fetchData() {
      fetch("http://localhost:3000/api/user/info")
        .then((res) => res.json())
        .then((data) => {this.info = data; console.log(data)})
        .catch((err)=>console.log(err));
    }
  }
};
</script>
