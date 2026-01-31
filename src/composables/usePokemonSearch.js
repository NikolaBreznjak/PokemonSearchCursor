import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { usePokemonStore } from "../stores/pokemonStore";
import { SEARCH_DEBOUNCE_MS } from "../utils/constants";

/**
 * Composable for managing Pokémon search functionality
 * @returns {Object} Search state and handlers
 */
export function usePokemonSearch() {
  const router = useRouter();
  const store = usePokemonStore();

  const searchQuery = ref("");
  const showAutocomplete = ref(false);
  const highlightedIndex = ref(-1);

  // Debounce timer
  let debounceTimer = null;

  // Watch and update store with debounce
  watch(searchQuery, (newValue) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      store.setSearchQuery(newValue);
      if (newValue.length >= 2) {
        showAutocomplete.value = true;
        highlightedIndex.value = -1;
      } else {
        showAutocomplete.value = false;
      }
    }, SEARCH_DEBOUNCE_MS);
  });

  const suggestions = computed(() => store.autocompleteSuggestions);

  /**
   * Handle search submission
   */
  const handleSearch = () => {
    const query = searchQuery.value.trim();
    if (query) {
      showAutocomplete.value = false;
      router.push(`/pokemon/${query.toLowerCase()}`);
      searchQuery.value = "";
      store.setSearchQuery("");
    }
  };

  /**
   * Handle suggestion selection
   * @param {Object} pokemon - Selected pokemon { name, id }
   */
  const handleSelect = (pokemon) => {
    showAutocomplete.value = false;
    searchQuery.value = "";
    store.setSearchQuery("");
    router.push(`/pokemon/${pokemon.name}`);
  };

  /**
   * Handle keyboard navigation in autocomplete
   * @param {KeyboardEvent} event
   */
  const handleKeydown = (event) => {
    if (!showAutocomplete.value || suggestions.value.length === 0) {
      if (event.key === "Enter") {
        handleSearch();
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        highlightedIndex.value = Math.min(
          highlightedIndex.value + 1,
          suggestions.value.length - 1
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        highlightedIndex.value = Math.max(highlightedIndex.value - 1, -1);
        break;
      case "Enter":
        event.preventDefault();
        if (highlightedIndex.value >= 0) {
          handleSelect(suggestions.value[highlightedIndex.value]);
        } else {
          handleSearch();
        }
        break;
      case "Escape":
        showAutocomplete.value = false;
        highlightedIndex.value = -1;
        break;
    }
  };

  /**
   * Close autocomplete dropdown
   */
  const closeAutocomplete = () => {
    showAutocomplete.value = false;
    highlightedIndex.value = -1;
  };

  return {
    searchQuery,
    showAutocomplete,
    highlightedIndex,
    suggestions,
    handleSearch,
    handleSelect,
    handleKeydown,
    closeAutocomplete,
  };
}
