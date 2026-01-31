import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView.vue";
import HomeView from "../views/HomeView.vue";
import PokemonDetailView from "../views/PokemonDetailView.vue";

const routes = [
  {
    path: "/",
    name: "landing",
    component: LandingView,
    meta: { title: "PokéSearch - Discover Pokémon" },
  },
  {
    path: "/browse",
    name: "browse",
    component: HomeView,
    meta: { title: "Browse Pokémon - PokéSearch" },
  },
  {
    path: "/pokemon/:nameOrId",
    name: "pokemon-detail",
    component: PokemonDetailView,
    meta: { title: "PokéSearch" },
  },
  {
    // Catch-all route for 404
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory("/PokemonSearch/"),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

// Update document title on route change
router.afterEach((to) => {
  document.title = to.meta.title || "PokéSearch";
});

export default router;
