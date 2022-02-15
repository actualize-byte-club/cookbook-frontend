<script>
import axios from "axios";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export default {
  data: function () {
    return {
      recipes: []
    };
  },
  created: function () {
    console.log(dayjs().to(dayjs("2022-01-17T17:49:11.365Z")));
    axios.get("/recipes").then((response) => {
      console.log("Recipes Index:", response.data);
      this.recipes = response.data;
    });
  },
  methods: {
    relativeDate: function (date) {
      return dayjs().to(dayjs(date));
    }
  }
};
</script>

<template>
  <div class="recipes-index">
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
      <h2>{{ recipe.title }}</h2>
      <router-link v-bind:to="`/recipes/${recipe.id}`"
        ><img v-bind:src="recipe.image_url" alt=""
      /></router-link>
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Directions: {{ recipe.directions }}</p>
      <p>Prep time: {{ recipe.friendly_prep_time }}</p>
      <p>Created {{ relativeDate(recipe.created_at) }}</p>
    </div>
  </div>
</template>
