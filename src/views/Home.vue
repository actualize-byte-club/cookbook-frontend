<script>
export default {
  data: function () {
    return {
      recipes: [
        { id: 1, title: "Raw Eggs", chef: "Jay Wengrow" },
        { id: 2, title: "Empty Sandwich", chef: "Jay Wengrow" },
        { id: 3, title: "Ice", chef: "Peter Jang" },
        { id: 4, title: "Coffee", chef: "Cheddar" }
      ]
    };
  },
  created: function () {},
  methods: {}
};
</script>

<template>
  <div class="home">
    <h1>All Recipes</h1>
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
      <h2>Title: {{ recipe.title }}</h2>
      <p>Chef: {{ recipe.chef }}</p>
    </div>
  </div>
</template>
