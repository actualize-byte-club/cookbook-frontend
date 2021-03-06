import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Test from "../views/Test.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import RecipesIndex from "../views/RecipesIndex.vue";
import RecipesNew from "../views/RecipesNew.vue";
import RecipesShow from "../views/RecipesShow.vue";
import RecipesEdit from "../views/RecipesEdit.vue";
import MapBox from "../views/Map.vue";
import GeocodeMap from "../views/GeocodeMap.vue";
import BootstrapRecipesIndex from "../views/BootstrapRecipesIndex.vue";
import MessagesIndex from "../views/MessagesIndex.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/test",
    name: "Test",
    component: Test
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout
  },
  {
    path: "/recipes",
    name: "RecipesIndex",
    component: RecipesIndex
  },
  {
    path: "/recipes/new",
    name: "RecipesNew",
    component: RecipesNew
  },
  {
    path: "/recipes/:id",
    name: "RecipesShow",
    component: RecipesShow
  },
  {
    path: "/recipes/:id/edit",
    name: "RecipesEdit",
    component: RecipesEdit
  },
  {
    path: "/map",
    name: "map",
    component: MapBox
  },
  {
    path: "/geocode-map",
    name: "GeocodeMap",
    component: GeocodeMap
  },
  {
    path: "/bootstrap-recipes",
    name: "BootstrapRecipesIndex",
    component: BootstrapRecipesIndex
  },
  {
    path: "/messages",
    name: "MessagesIndex",
    component: MessagesIndex
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
