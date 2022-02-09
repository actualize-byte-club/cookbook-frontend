<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recipes: [],
      newRecipeParams: {},
      currentRecipe: {}
    };
  },
  created: function () {
    this.indexRecipes();
  },
  methods: {
    indexRecipes: function () {
      console.log("Sanity check...");
      axios.get("http://localhost:3000/recipes").then((response) => {
        console.log(response.data);
        this.recipes = response.data;
      });
    },
    createRecipe: function () {
      axios
        .post("http://localhost:3000/recipes", this.newRecipeParams)
        .then((response) => {
          console.log("Success!", response.data);
          this.recipes.push(response.data);
          this.newRecipeParams = {};
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    showRecipe: function (recipe) {
      console.log(recipe);
      this.currentRecipe = recipe;
      document.querySelector("#recipe-details").showModal();
    }
  }
};
</script>

<template>
  <div class="home">
    <h1>New Recipe</h1>
    <p>{{ newRecipeParams }}</p>
    <div>
      Title: <input type="text" v-model="newRecipeParams.title" />

      Ingredients: <input type="text" v-model="newRecipeParams.ingredients" />

      Directions: <input type="text" v-model="newRecipeParams.directions" />

      Prep Time: <input type="text" v-model="newRecipeParams.prep_time" />

      Image Url: <input type="text" v-model="newRecipeParams.image_url" />

      <button v-on:click="createRecipe()">Create</button>
    </div>
    <h1>All Recipes</h1>
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
      <h2>Title: {{ recipe.title }}</h2>
      <img v-bind:src="recipe.image_url" alt="" /><br />
      <button v-on:click="showRecipe(recipe)">More Info</button>
    </div>
    <dialog id="recipe-details">
      <form method="dialog">
        <h1>Recipe Info</h1>
        <p>Title: {{ currentRecipe.title }}</p>
        <img v-bind:src="currentRecipe.image_url" alt="" />
        <p>Ingredients: {{ currentRecipe.ingredients }}</p>
        <p>Directions: {{ currentRecipe.directions }}.</p>
        <p>Prep Time: {{ currentRecipe.prep_time }}</p>

        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style>
img {
  width: 250px;
}
</style>
