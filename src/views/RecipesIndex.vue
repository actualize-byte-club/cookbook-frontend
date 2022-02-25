<script>
import axios from "axios";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export default {
  data: function () {
    return {
      recipes: [],
      titleFilter: ""
    };
  },
  created: function () {
    axios.get("/recipes").then((response) => {
      console.log("Recipes Index:", response.data);
      this.recipes = response.data;
    });
  },
  methods: {
    relativeDate: function (date) {
      return dayjs().to(dayjs(date));
    }
  },
  computed: {
    filteredRecipes() {
      return this.recipes.filter((recipe) => {
        return recipe.title
          .toLowerCase()
          .includes(this.titleFilter.toLowerCase());
      });
    }
  }
};
</script>

<template>
  <div class="recipes-index">
    <div id="jumbotron" class="container-fluid text-sm-center p-5">
      <!-- bg-light is background color & p-5 is padding -->
      <h1 class="display-2">Recipes</h1>
      <p class="lead">Check out our amazing Byte Club recipes</p>
    </div>
    <div class="container">
      <div class="input-group mb-3 mt-4">
        <span class="input-group-text" id="basic-addon1">Search</span>
        <input
          type="text"
          class="form-control"
          placeholder="Chocolate chip cookies..."
          aria-describedby="basic-addon1"
          v-model="titleFilter"
          list="recipeTitles"
        />
      </div>
      <datalist id="recipeTitles">
        <option v-for="recipe in recipes" v-bind:key="recipe.id">
          {{ recipe.title }}
        </option>
      </datalist>

      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        <transition-group
          appear
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <div
            class="col"
            v-for="recipe in filteredRecipes"
            v-bind:key="recipe.id"
          >
            <div class="card">
              <router-link v-bind:to="`/recipes/${recipe.id}`">
                <img
                  v-bind:src="recipe.image_url"
                  class="card-img-top"
                  alt="..."
                />
              </router-link>
              <div class="card-body">
                <h5 class="card-title">{{ recipe.title }}</h5>
                <p class="card-text">Ingredients: {{ recipe.ingredients }}</p>
                <p class="card-text">Directions: {{ recipe.directions }}</p>
              </div>
              <div class="card-footer">
                <small class="text-muted"
                  >Created {{ relativeDate(recipe.created_at) }}</small
                >
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>
