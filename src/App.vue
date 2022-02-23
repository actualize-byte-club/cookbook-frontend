<script>
export default {
  data: function () {
    return {
      isLoggedIn: !!localStorage.jwt,
      flashMessage: null
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
      this.flashMessage = localStorage.flashMessage;
      localStorage.removeItem("flashMessage");
    }
  }
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Cookbook</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" to="/recipes">Recipes</router-link>
          <router-link v-if="!isLoggedIn" class="nav-link" to="/signup"
            >Signup</router-link
          >
          <router-link v-if="!isLoggedIn" class="nav-link" to="/login"
            >Login</router-link
          >
          <router-link v-if="isLoggedIn" class="nav-link" to="/recipes/new"
            >New Recipe</router-link
          >
          <router-link v-if="isLoggedIn" class="nav-link" to="/logout"
            >Logout</router-link
          >
          <router-link class="nav-link" to="/bootstrap-recipes"
            >Bootstrap Recipes</router-link
          >
        </div>
      </div>
    </div>
  </nav>

  <div v-if="flashMessage">
    {{ flashMessage }} <button v-on:click="flashMessage = ''">Dismiss</button>
  </div>
  <div class="container">
    <router-view />
  </div>
</template>

<style>
body {
  background-image: url("/img/food.png");
}

.card img {
  object-fit: cover;
  height: 250px;
}
</style>
