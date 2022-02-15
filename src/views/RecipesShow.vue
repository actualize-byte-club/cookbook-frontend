<script>
import axios from "axios";

export default {
  data: function () {
    return {
      recipe: {}
      // currentUserId: localStorage.user_id
    };
  },
  created: function () {
    axios.get(`/recipes/${this.$route.params.id}`).then((response) => {
      console.log("Recipes Show:", response.data);
      this.recipe = response.data;
    });
  },
  methods: {
    destroyRecipe: function () {
      if (confirm("Are you sure you to delete this?")) {
        axios.delete(`/recipes/${this.recipe.id}`).then((response) => {
          console.log("Success", response.data);
          this.$router.push("/recipes");
        });
      }
    }
  }
};
</script>

<template>
  <div class="recipes-show">
    <!-- <p>Recipe user id: {{ recipe.user_id }}</p>
    <p>Current user id: {{ currentUserId }}</p> -->

    <h2>{{ recipe.title }}</h2>
    <img v-bind:src="recipe.image_url" alt="" />
    <p>Ingredients: {{ recipe.ingredients }}</p>
    <p>Directions: {{ recipe.directions }}</p>
    <p>Prep time: {{ recipe.friendly_prep_time }}</p>
    <div v-if="recipe.owner">
      <button>
        <router-link v-bind:to="`/recipes/${recipe.id}/edit`">Edit</router-link>
      </button>
      |
      <button v-on:click="destroyRecipe()">Delete</button>
    </div>
  </div>
</template>
