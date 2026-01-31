<script setup>
import { computed } from "vue";
import PokemonTypeTag from "./PokemonTypeTag.vue";
import PokemonStats from "./PokemonStats.vue";
import AbilityCard from "./AbilityCard.vue";
import {
  capitalize,
  formatPokemonId,
  formatHeight,
  formatWeight,
} from "../../utils/formatters";

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

const spriteVariants = computed(() => {
  const sprites = props.pokemon.sprites;
  return [
    { label: "Front", src: sprites.front },
    { label: "Back", src: sprites.back },
    { label: "Shiny Front", src: sprites.frontShiny },
    { label: "Shiny Back", src: sprites.backShiny },
  ].filter((s) => s.src);
});
</script>

<template>
  <article class="max-w-4xl mx-auto">
    <!-- Main Card -->
    <div class="bg-white rounded-2xl shadow-card overflow-hidden">
      <!-- Header Section -->
      <div class="bg-gradient-to-br from-pokemon-blue to-blue-600 p-6 sm:p-8 text-white">
        <div class="flex flex-col sm:flex-row items-center gap-6">
          <!-- Main Artwork -->
          <div class="w-48 h-48 sm:w-56 sm:h-56 bg-white/20 rounded-2xl flex items-center justify-center">
            <img
              :src="pokemon.sprites.artwork"
              :alt="`${capitalize(pokemon.name)} official artwork`"
              class="w-40 h-40 sm:w-48 sm:h-48 object-contain drop-shadow-lg"
            />
          </div>

          <!-- Basic Info -->
          <div class="text-center sm:text-left flex-grow">
            <span class="text-white/70 font-mono text-lg">
              {{ formatPokemonId(pokemon.id) }}
            </span>
            <h1 class="text-3xl sm:text-4xl font-bold mt-1 mb-4">
              {{ capitalize(pokemon.name) }}
            </h1>

            <!-- Types -->
            <div class="flex gap-2 justify-center sm:justify-start mb-4">
              <PokemonTypeTag
                v-for="type in pokemon.types"
                :key="type"
                :type="type"
                size="lg"
              />
            </div>

            <!-- Physical Info -->
            <div class="flex gap-6 justify-center sm:justify-start text-white/90">
              <div>
                <span class="text-white/60 text-sm block">Height</span>
                <span class="font-semibold">{{ formatHeight(pokemon.height) }}</span>
              </div>
              <div>
                <span class="text-white/60 text-sm block">Weight</span>
                <span class="font-semibold">{{ formatWeight(pokemon.weight) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sprite Gallery -->
      <div class="p-6 border-b border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Sprites</h3>
        <div class="flex flex-wrap justify-center gap-4">
          <div
            v-for="sprite in spriteVariants"
            :key="sprite.label"
            class="flex flex-col items-center"
          >
            <div class="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
              <img
                :src="sprite.src"
                :alt="`${capitalize(pokemon.name)} ${sprite.label.toLowerCase()}`"
                class="w-16 h-16 object-contain pixelated"
              />
            </div>
            <span class="text-xs text-gray-500 mt-1">{{ sprite.label }}</span>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="p-6 border-b border-gray-100">
        <PokemonStats :stats="pokemon.stats" />
      </div>

      <!-- Abilities Section -->
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Abilities</h3>
        <div class="grid gap-3 sm:grid-cols-2">
          <AbilityCard
            v-for="ability in pokemon.abilities"
            :key="ability.name"
            :ability="ability"
          />
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.pixelated {
  image-rendering: pixelated;
}
</style>
