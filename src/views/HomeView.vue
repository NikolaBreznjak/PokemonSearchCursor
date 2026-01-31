<script setup>
import { onMounted, computed } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";
import PokemonGrid from "../components/pokemon/PokemonGrid.vue";
import PaginationControls from "../components/common/PaginationControls.vue";
import ErrorMessage from "../components/common/ErrorMessage.vue";

const store = usePokemonStore();

const pokemonList = computed(() => store.pokemonList);
const currentPage = computed(() => store.currentPage);
const totalPages = computed(() => store.totalPages);
const isLoading = computed(() => store.isLoading);
const error = computed(() => store.error);

const handlePageChange = (page) => {
  store.fetchPokemonList(page);
  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleRetry = () => {
  store.clearError();
  store.fetchPokemonList(currentPage.value);
};

onMounted(() => {
  if (store.pokemonList.length === 0) {
    store.fetchPokemonList();
  }
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="sr-only">Pokémon List</h1>

    <!-- Error State -->
    <ErrorMessage
      v-if="error && !isLoading"
      :message="error"
      :retryable="true"
      @retry="handleRetry"
    />

    <!-- Pokemon Grid -->
    <PokemonGrid
      v-else
      :pokemon="pokemonList"
      :is-loading="isLoading"
    />

    <!-- Pagination -->
    <PaginationControls
      v-if="!error && totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      :disabled="isLoading"
      @page-change="handlePageChange"
      class="mt-8"
    />
  </div>
</template>
