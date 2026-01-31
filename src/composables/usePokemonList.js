import { computed, onMounted } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";

/**
 * Composable for managing the Pokémon list and pagination
 * @returns {Object} List state and handlers
 */
export function usePokemonList() {
  const store = usePokemonStore();

  // Fetch initial data on mount
  onMounted(() => {
    if (store.pokemonList.length === 0) {
      store.fetchPokemonList();
    }
  });

  /**
   * Navigate to a specific page
   * @param {number} page - Page number to navigate to
   */
  const goToPage = (page) => {
    store.fetchPokemonList(page);
  };

  /**
   * Retry fetching the current page
   */
  const retry = () => {
    store.clearError();
    store.fetchPokemonList(store.currentPage);
  };

  return {
    pokemonList: computed(() => store.pokemonList),
    currentPage: computed(() => store.currentPage),
    totalPages: computed(() => store.totalPages),
    isLoading: computed(() => store.isLoading),
    error: computed(() => store.error),
    goToPage,
    retry,
  };
}
