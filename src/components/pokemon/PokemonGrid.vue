<script setup>
import PokemonCard from "./PokemonCard.vue";
import SkeletonCard from "../common/SkeletonCard.vue";

const props = defineProps({
  pokemon: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

// Show 20 skeleton cards during loading
const skeletonCount = 20;
</script>

<template>
  <section aria-label="Pokémon grid">
    <!-- Loading Skeletons -->
    <div
      v-if="isLoading"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      aria-busy="true"
      aria-live="polite"
    >
      <SkeletonCard
        v-for="n in skeletonCount"
        :key="n"
      />
      <span class="sr-only">Loading Pokémon...</span>
    </div>

    <!-- Pokemon Cards -->
    <div
      v-else-if="pokemon.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      <PokemonCard
        v-for="poke in pokemon"
        :key="poke.id"
        :pokemon="poke"
      />
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="text-center py-12"
    >
      <p class="text-gray-500 text-lg">
        No Pokémon found
      </p>
    </div>
  </section>
</template>
