<script setup>
import { onMounted } from "vue";
import { usePokemonStore } from "./stores/pokemonStore";
import AppHeader from "./components/layout/AppHeader.vue";
import AppFooter from "./components/layout/AppFooter.vue";

const store = usePokemonStore();

// Prefetch pokemon names for autocomplete on app load
onMounted(() => {
  store.fetchAllPokemonNames();
});
</script>

<template>
  <div class="min-h-screen flex flex-col font-poppins">
    <!-- Skip link for accessibility -->
    <a href="#main-content" class="skip-link">
      Skip to main content
    </a>

    <AppHeader />

    <main id="main-content" class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <AppFooter />

    <!-- Live region for screen reader announcements -->
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      class="sr-only"
    >
      <!-- Announcements will be injected here -->
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
