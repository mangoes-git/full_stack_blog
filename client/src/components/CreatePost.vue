<template>
  <div>
    <b-row>
      <b-button
        class="mx-auto"
        id="create-post-button"
        v-b-modal="'create-post-modal'"
        >Create Post</b-button
      >

      <b-modal id="create-post-modal" title="Create Post" @submit="onSubmit">
        <b-container fluid>
          <b-form @submit="onSubmit">
            <b-form-group
              id="post-title-text"
              label="Post Title"
              label-for="post-title-input"
              description="Give your post a title."
            >
              <b-form-input
                id="post-title-input"
                type="content"
                v-model="form.title"
                placeholder="Start typing here..."
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="post-content-text"
              label="Post Content"
              label-for="post-content-input"
              description="Press submit when you're done."
            >
              <b-form-textarea
                id="post-content-input"
                type="content"
                v-model="form.content"
                placeholder="Start typing here..."
                required
              ></b-form-textarea>
            </b-form-group>
            
          </b-form>
          
        </b-container>
        <template #modal-footer>
          <b-button type="reset" variant="secondary" @click="$bvModal.hide('create-post-modal')">Cancel</b-button>
          <b-button type="submit" variant="primary" @click="onSubmit">Submit</b-button>
        </template>
      </b-modal>
    </b-row>
  </div>
</template>


<script>
export default {
  name: "post-modal",
  props: [],
  data() {
    return {
      form: {
        content: '',
        title: '',
      }
    }
  },
  methods: {
    async onSubmit() {
      if (!this.form.title || !this.form.content) {
        alert('All fields must be filled.');
        return;
      }
      console.log('submitting data');
      console.log(this.form);
      fetch('http://localhost:3000/api/posts', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          author: 'defaultuser',
          title: this.form.title,
          content: this.form.content
        })
      })
      this.$bvModal.hide('create-post-modal')
    },
  },
};
</script>

<style scoped>
#create-post-button {
  margin-top: 10px;
}
</style>