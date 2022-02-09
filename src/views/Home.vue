<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recipes: [],
      newRecipeParams: {}
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
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    }
  }
};
</script>

<template>
  <div class="home">
    <h1>New Recipe</h1>
    <p>{{ newRecipeParams }}</p>
    <div>Title: <input type="text" v-model="newRecipeParams.title" /></div>
    <div>
      Ingredients: <input type="text" v-model="newRecipeParams.ingredients" />
    </div>
    <div>
      Directions: <input type="text" v-model="newRecipeParams.directions" />
    </div>
    <div>
      Prep Time: <input type="text" v-model="newRecipeParams.prep_time" />
    </div>
    <div>
      Image Url: <input type="text" v-model="newRecipeParams.image_url" />
    </div>
    <button v-on:click="createRecipe()">Create</button>
    <h1>All Recipes</h1>
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
      <h2>Title: {{ recipe.title }}</h2>
      <img v-bind:src="recipe.image_url" alt="" />
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Directions: {{ recipe.directions }}</p>
    </div>
  </div>
</template>

<style>
img {
  width: 250px;
}
</style>
