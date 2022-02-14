<script>
import axios from "axios";

export default {
  data: function () {
    return {
      recipe: {}
    };
  },
  created: function () {
    axios.get(`/recipes/${this.$route.params.id}`).then((response) => {
      console.log("Recipes Show:", response.data);
      this.recipe = response.data;
    });
  },
  methods: {}
};
</script>

<template>
  <div class="recipes-show">
    <h2>{{ recipe.title }}</h2>
    <img v-bind:src="recipe.image_url" alt="" />
    <p>Ingredients: {{ recipe.ingredients }}</p>
    <p>Directions: {{ recipe.directions }}</p>
    <p>Prep time: {{ recipe.friendly_prep_time }}</p>
  </div>
</template>
