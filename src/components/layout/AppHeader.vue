<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import SearchBar from "../search/SearchBar.vue";

const router = useRouter();
const route = useRoute();

const isLandingPage = computed(() => route.path === "/");

const goHome = () => {
  router.push("/");
};

const goToBrowse = () => {
  router.push("/browse");
};
</script>

<template>
  <header class="bg-pokemon-red shadow-md sticky top-0 z-40" role="banner">
    <div class="container mx-auto px-4 py-4">
      <div class="flex flex-col sm:flex-row items-center gap-4">
        <!-- Logo -->
        <button
          @click="goHome"
          class="flex items-center gap-2 text-white hover:opacity-90 transition-opacity"
          aria-label="Go to home page"
        >
          <svg
            class="w-10 h-10"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="48" fill="#CC0000" stroke="white" stroke-width="4"/>
            <rect x="0" y="47" width="100" height="6" fill="white"/>
            <circle cx="50" cy="50" r="48" fill="white" clip-path="url(#header-bottom)"/>
            <defs>
              <clipPath id="header-bottom">
                <rect x="0" y="50" width="100" height="50"/>
              </clipPath>
            </defs>
            <circle cx="50" cy="50" r="16" fill="white" stroke="white" stroke-width="4"/>
            <circle cx="50" cy="50" r="8" fill="#CC0000"/>
          </svg>
          <span class="text-2xl font-bold tracking-tight">
            PokéSearch
          </span>
        </button>

        <!-- Navigation & Search -->
        <div class="flex-grow flex items-center gap-4 w-full sm:w-auto">
          <!-- Browse Link (hidden on landing) -->
          <button
            v-if="!isLandingPage"
            @click="goToBrowse"
            class="hidden sm:flex items-center gap-1 text-white/90 hover:text-white font-medium transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Browse
          </button>

          <!-- Search Bar (hidden on landing) -->
          <div v-if="!isLandingPage" class="flex-grow w-full sm:max-w-xl">
            <SearchBar placeholder="Search Pokémon by name or ID..." />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
