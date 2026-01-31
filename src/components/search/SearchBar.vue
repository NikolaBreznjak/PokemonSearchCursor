<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { usePokemonStore } from "../../stores/pokemonStore";
import AutocompleteDropdown from "./AutocompleteDropdown.vue";
import { SEARCH_DEBOUNCE_MS } from "../../utils/constants";

const props = defineProps({
  placeholder: {
    type: String,
    default: "Search Pokémon...",
  },
});

const router = useRouter();
const store = usePokemonStore();

const inputValue = ref("");
const showDropdown = ref(false);
const highlightedIndex = ref(-1);
const inputRef = ref(null);
const containerRef = ref(null);

// Debounce search query updates
let debounceTimer = null;
watch(inputValue, (newValue) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    store.setSearchQuery(newValue);
    if (newValue.length >= 2) {
      showDropdown.value = true;
      highlightedIndex.value = -1;
    } else {
      showDropdown.value = false;
    }
  }, SEARCH_DEBOUNCE_MS);
});

const suggestions = computed(() => store.autocompleteSuggestions);

const handleSearch = () => {
  if (inputValue.value.trim()) {
    showDropdown.value = false;
    router.push(`/pokemon/${inputValue.value.trim().toLowerCase()}`);
    inputValue.value = "";
    store.setSearchQuery("");
  }
};

const handleSelect = (pokemon) => {
  showDropdown.value = false;
  inputValue.value = "";
  store.setSearchQuery("");
  router.push(`/pokemon/${pokemon.name}`);
};

const handleKeydown = (event) => {
  if (!showDropdown.value || suggestions.value.length === 0) {
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
      showDropdown.value = false;
      highlightedIndex.value = -1;
      break;
  }
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (containerRef.value && !containerRef.value.contains(event.target)) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  clearTimeout(debounceTimer);
});
</script>

<template>
  <div ref="containerRef" class="relative">
    <label for="pokemon-search" class="sr-only">
      Search for a Pokémon
    </label>
    <div class="relative">
      <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          class="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <input
        ref="inputRef"
        id="pokemon-search"
        v-model="inputValue"
        type="search"
        role="combobox"
        :aria-expanded="showDropdown && suggestions.length > 0"
        aria-controls="autocomplete-list"
        aria-autocomplete="list"
        :aria-activedescendant="highlightedIndex >= 0 ? `suggestion-${highlightedIndex}` : undefined"
        :placeholder="placeholder"
        class="w-full pl-10 pr-4 py-3 rounded-full border-2 border-transparent bg-white shadow-md focus:border-pokemon-yellow focus:ring-0 focus:outline-none transition-all text-gray-900 placeholder-gray-400"
        @keydown="handleKeydown"
        @focus="inputValue.length >= 2 && (showDropdown = true)"
      />
    </div>

    <AutocompleteDropdown
      :suggestions="suggestions"
      :is-visible="showDropdown && suggestions.length > 0"
      :highlighted-index="highlightedIndex"
      @select="handleSelect"
      @highlight="(index) => (highlightedIndex = index)"
    />
  </div>
</template>
