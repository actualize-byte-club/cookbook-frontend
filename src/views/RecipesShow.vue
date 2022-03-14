<script>
import axios from "axios";

export default {
  data: function () {
    return {
      recipe: {}
      // currentUserId: localStorage.user_id
    };
  },
  created: function () {
    axios.get(`/recipes/${this.$route.params.id}`).then((response) => {
      console.log("Recipes Show:", response.data);
      this.recipe = response.data;
    });
  },
  methods: {
    destroyRecipe: function () {
      if (confirm("Are you sure you to delete this?")) {
        axios.delete(`/recipes/${this.recipe.id}`).then((response) => {
          console.log("Success", response.data);
          this.$router.push("/recipes");
        });
      }
    }
  }
};
</script>

<template>
  <div class="recipes-show">
    <!-- ======= Breadcrumbs ======= -->
    <div class="breadcrumbs" data-aos="fade-in">
      <div class="container">
        <h2>{{ recipe.title }}</h2>
      </div>
    </div>
    <!-- End Breadcrumbs -->

    <!-- ======= About Section ======= -->
    <section id="about" class="about">
      <div class="container" data-aos="fade-up">
        <div class="row">
          <div
            class="col-lg-6 order-1 order-lg-2"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <img v-bind:src="recipe.image_url" class="img-fluid" alt="" />
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h3>
              Voluptatem dignissimos provident quasi corporis voluptates sit
              assumenda.
            </h3>
            <p class="fst-italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ul>
              <li>
                <i class="bi bi-check-circle"></i> Ingredients:
                {{ recipe.ingredients }}
              </li>
              <li>
                <i class="bi bi-check-circle"></i> Directions:
                {{ recipe.directions }}
              </li>
              <li>
                <i class="bi bi-check-circle"></i> Prep time:
                {{ recipe.friendly_prep_time }}
              </li>
            </ul>
            <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- End About Section -->

    <!-- <p>Recipe user id: {{ recipe.user_id }}</p>
    <p>Current user id: {{ currentUserId }}</p> -->

    <div v-if="recipe.owner">
      <button>
        <router-link v-bind:to="`/recipes/${recipe.id}/edit`">Edit</router-link>
      </button>
      |
      <button v-on:click="destroyRecipe()">Delete</button>
    </div>
  </div>
</template>
