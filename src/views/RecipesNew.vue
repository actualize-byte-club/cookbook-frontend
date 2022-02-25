<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newRecipeParams: {},
      errors: [],
      sadStatus: ""
    };
  },
  methods: {
    createRecipe: function () {
      axios
        .post("/recipes", this.newRecipeParams)
        .then((response) => {
          console.log("New Recipe:", response.data);
          localStorage.setItem("flashMessage", "Recipe successfully created!");
          this.$router.push("/recipes");
        })
        .catch((error) => {
          this.sadStatus = error.response.status;
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>

<template>
  <div class="recipes-new">
    <div id="jumbotron" class="container-fluid text-sm-center p-5">
      <!-- bg-light is background color & p-5 is padding -->
      <h1 class="display-2">New Recipe</h1>
      <p class="lead">Add to our collection</p>
    </div>
    <div class="container">
      <form class="mt-5 mb-5 text-center" v-on:submit.prevent="createRecipe()">
        <img
          v-if="sadStatus"
          v-bind:src="`https://http.cat/${sadStatus}`"
          alt=""
        />
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="Chocolate Chip Cookies"
            v-model="newRecipeParams.title"
          />
          <label for="floatingInput">Title</label>
        </div>
        <div class="form-floating mb-3">
          <textarea
            class="form-control"
            placeholder="Ingredients"
            id="floatingTextarea"
            v-model="newRecipeParams.ingredients"
          ></textarea>
          <label for="floatingTextarea">Ingredients</label>
        </div>
        <div class="form-floating mb-3">
          <textarea
            class="form-control"
            placeholder="Directions"
            id="floatingTextarea"
            v-model="newRecipeParams.directions"
          ></textarea>
          <label for="floatingTextarea">Directions</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="20"
            v-model="newRecipeParams.prep_time"
          />
          <label for="floatingInput">Prep Time (in minutes)</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="https://example.com"
            v-model="newRecipeParams.image_url"
          />
          <label for="floatingInput">Image Url</label>
        </div>

        <button type="submit" class="btn btn-lg bg-outline-dark">Submit</button>
      </form>
    </div>
  </div>
</template>
