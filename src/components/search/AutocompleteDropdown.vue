<script setup>
import { capitalize, formatPokemonId } from "../../utils/formatters";

const props = defineProps({
  suggestions: {
    type: Array,
    required: true,
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
  highlightedIndex: {
    type: Number,
    default: -1,
  },
});

const emit = defineEmits(["select", "highlight"]);

const handleSelect = (pokemon) => {
  emit("select", pokemon);
};

const handleMouseEnter = (index) => {
  emit("highlight", index);
};
</script>

<template>
  <transition name="dropdown">
    <ul
      v-if="isVisible"
      id="autocomplete-list"
      role="listbox"
      aria-label="Search suggestions"
      class="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
    >
      <li
        v-for="(pokemon, index) in suggestions"
        :key="pokemon.id"
        :id="`suggestion-${index}`"
        role="option"
        :aria-selected="index === highlightedIndex"
        :class="[
          'px-4 py-3 cursor-pointer flex items-center gap-3 transition-colors',
          index === highlightedIndex
            ? 'bg-pokemon-yellow/20'
            : 'hover:bg-gray-100',
        ]"
        @click="handleSelect(pokemon)"
        @mouseenter="handleMouseEnter(index)"
      >
        <span class="text-gray-400 font-mono text-sm min-w-[3rem]">
          {{ formatPokemonId(pokemon.id) }}
        </span>
        <span class="font-medium text-gray-900">
          {{ capitalize(pokemon.name) }}
        </span>
      </li>
    </ul>
  </transition>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
