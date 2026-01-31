import { computed, watch, onUnmounted } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";

/**
 * Composable for fetching and managing Pokémon details
 * @param {import('vue').Ref<string|number>} nameOrId - Reactive ref with pokemon name or ID
 * @returns {Object} Detail state and handlers
 */
export function usePokemonDetail(nameOrId) {
  const store = usePokemonStore();

  // Watch for route param changes and fetch details
  watch(
    nameOrId,
    (newValue) => {
      if (newValue) {
        store.fetchPokemonDetail(newValue);
      }
    },
    { immediate: true }
  );

  /**
   * Retry fetching the current pokemon
   */
  const retry = () => {
    store.clearError();
    if (nameOrId.value) {
      store.fetchPokemonDetail(nameOrId.value);
    }
  };

  // Clean up on unmount
  onUnmounted(() => {
    store.clearError();
  });

  return {
    pokemon: computed(() => store.currentPokemon),
    isLoading: computed(() => store.isLoadingDetail),
    error: computed(() => store.error),
    retry,
  };
}
