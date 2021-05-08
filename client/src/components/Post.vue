<template>
  <b-row class="mt-3">
    <b-card no-body class="mx-auto" style="width:50%">
      <b-card-body>
        <b-card-title>{{ title }}</b-card-title>
        <b-card-sub-title class="mb-2">By {{ author }}</b-card-sub-title>
        <b-card-text>
          {{ content }}
        </b-card-text>
      </b-card-body>
      <b-card-body>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </b-card-body>

      <b-card-footer>Last edited: {{ last_edit }}</b-card-footer>
    </b-card>
  </b-row>
</template>

<script>
export default {
  props: [
    "_id",
    "title",
    "author",
    "content",
    "creation_date",
    "last_edit"
  ]
};
</script>
