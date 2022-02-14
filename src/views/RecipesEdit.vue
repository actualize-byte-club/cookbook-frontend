<script>
import axios from "axios";

export default {
  data: function () {
    return {
      recipe: {},
      errors: []
    };
  },
  created: function () {
    axios.get(`/recipes/${this.$route.params.id}`).then((response) => {
      console.log("Recipe to edit:", response.data);
      this.recipe = response.data;
    });
  },
  methods: {
    updateRecipe: function () {
      axios
        .patch(`/recipes/${this.recipe.id}`, this.recipe)
        .then((response) => {
          console.log("Updated Recipe:", response.data);
          this.$router.push(`/recipes/${this.recipe.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>

<template>
  <div class="recipes-new">
    <form v-on:submit.prevent="updateRecipe()">
      <h1>Edit Recipe</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <p>Current recipe: {{ recipe }}</p>
      <p><img v-bind:src="recipe.image_url" alt="" /></p>
      <div>
        <label>Title:</label>
        <input type="text" v-model="recipe.title" />
      </div>
      <div>
        <label>Ingredients:</label>
        <input type="text" v-model="recipe.ingredients" />
      </div>
      <div>
        <label>Directions:</label>
        <input type="text" v-model="recipe.directions" />
      </div>
      <div>
        <label>Prep Time:</label>
        <input type="text" v-model="recipe.prep_time" />
      </div>
      <div>
        <label>Image Url:</label>
        <input type="text" v-model="recipe.image_url" />
      </div>
      <input type="submit" value="Update" />
    </form>
  </div>
</template>
