<script>
/* global bootstrap */
import axios from "axios";

export default {
  data: function () {
    return {
      recipe: {},
      errors: []
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
    updateRecipe: function () {
      axios
        .patch(`/recipes/${this.recipe.id}`, this.recipe)
        .then((response) => {
          console.log("Updated Recipe:", response.data);
          localStorage.setItem("flashMessage", "Recipe successfully updated!");
          // // close modal
          var editRecipeModal = bootstrap.Modal.getInstance(
            document.getElementById("editRecipeModal")
          ); // Returns a Bootstrap modal instance
          editRecipeModal.hide();
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
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
            <p>
              <!-- Button trigger modal -->
              <button
                v-if="recipe.owner"
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#editRecipeModal"
              >
                Edit Recipe
              </button>
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

    <!-- Modal -->
    <div
      class="modal fade"
      id="editRecipeModal"
      tabindex="-1"
      aria-labelledby="editRecipeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editRecipeModalLabel">Edit Recipe</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="updateRecipe()">
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
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
              <input class="btn btn-primary" type="submit" value="Update" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
