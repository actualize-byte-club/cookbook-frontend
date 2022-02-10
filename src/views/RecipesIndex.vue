<script>
import axios from "axios";

export default {
  data: function () {
    return {
      recipes: []
    };
  },
  created: function () {
    axios.get("/recipes").then((response) => {
      console.log("Recipes Index:", response.data);
      this.recipes = response.data;
    });
  },
  methods: {}
};
</script>

<template>
  <div class="recipes-index">
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
      <h2>{{ recipe.title }}</h2>
      <img v-bind:src="recipe.image_url" alt="" />
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Directions: {{ recipe.directions }}</p>
      <p>Prep time: {{ recipe.friendly_prep_time }}</p>
    </div>
  </div>
</template>
