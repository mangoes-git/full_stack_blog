<template>
  <b-row class="mt-3">
    <b-card no-body class="mx-auto" style="width:50%">
      <b-card-body>
        <b-card-sub-title class="mb-2">By {{ author }}</b-card-sub-title>
        <b-card-text>
          <div v-if="content">
            {{ content }}
          </div>
          <div v-else class="empty-post-content">
            User forgot to include content.
          </div>
        </b-card-text>
      </b-card-body>
      <b-card-footer>Last edited: {{ last_edit }}</b-card-footer>
    </b-card>
  </b-row>
</template>

<script>
export default {
  props: [
    "id",
    "title",
    "author",
    "content",
    "creation_date",
    "last_edit",
  ]
};
</script>

<style scoped>
  .empty-post-content {
    font-style: italic
  }
</style>