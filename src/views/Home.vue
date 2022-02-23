<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recipes: [],
      newRecipeParams: {},
      currentRecipe: {},
      editRecipeParams: {}
    };
  },
  created: function () {
    this.indexRecipes();
  },
  methods: {
    indexRecipes: function () {
      axios.get("/recipes").then((response) => {
        console.log(response.data);
        this.recipes = response.data;
      });
    },
    createRecipe: function () {
      axios
        .post("/recipes", this.newRecipeParams)
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
      this.editRecipeParams = recipe;
      document.querySelector("#recipe-details").showModal();
    },
    updateRecipe: function (recipe) {
      axios
        .patch(`/recipes/${recipe.id}`, recipe)
        .then((response) => {
          console.log("Success!", response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    destroyRecipe: function (recipe) {
      if (confirm("Are you sure you to delete this?")) {
        axios.delete(`/recipes/${recipe.id}`).then((response) => {
          console.log("Success", response.data);
          var index = this.recipes.indexOf(recipe);
          this.recipes.splice(index, 1);
        });
      }
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
        <h2>Recipe Info</h2>
        <img v-bind:src="currentRecipe.image_url" alt="" />

        <p>Title: <input type="text" v-model="editRecipeParams.title" /></p>
        <p>
          Ingredients:
          <input type="text" v-model="editRecipeParams.ingredients" />
        </p>
        <p>
          Directions:
          <input type="text" v-model="editRecipeParams.directions" />
        </p>
        <p>
          Prep Time: <input type="text" v-model="editRecipeParams.prep_time" />
        </p>
        <p>
          Image Url: <input type="text" v-model="editRecipeParams.image_url" />
        </p>
        <button v-on:click="updateRecipe(currentRecipe)">Update</button>
        <button v-on:click="destroyRecipe(currentRecipe)">Destroy</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>
