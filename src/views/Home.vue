<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recipes: []
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
      var params = {
        title: "Veggie Chili",
        ingredients: "Vegetables, beans, impossible meat",
        directions: "Cook ingredients in a crock pot for 8 hours on low",
        prep_time: 30,
        image_url:
          "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco/k%2Farchive%2F9fff417ed363c61374bb3a2523683b9949b51fb9"
      };
      axios
        .post("http://localhost:3000/recipes", params)
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
