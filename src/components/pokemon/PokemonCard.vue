<script setup>
import { useRouter } from "vue-router";
import PokemonTypeTag from "./PokemonTypeTag.vue";
import { capitalize, formatPokemonId } from "../../utils/formatters";

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const handleClick = () => {
  router.push(`/pokemon/${props.pokemon.name}`);
};

const handleKeydown = (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handleClick();
  }
};
</script>

<template>
  <article
    class="bg-white rounded-xl shadow-card hover:shadow-card-hover transform hover:-translate-y-1 transition-all duration-200 cursor-pointer p-4 focus:outline-none focus:ring-2 focus:ring-pokemon-blue focus:ring-offset-2"
    role="button"
    tabindex="0"
    :aria-label="`View details for ${capitalize(pokemon.name)}, number ${pokemon.id}`"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <!-- Pokédex Number -->
    <div class="text-right">
      <span class="text-gray-400 font-mono text-sm">
        {{ formatPokemonId(pokemon.id) }}
      </span>
    </div>

    <!-- Sprite Image -->
    <div class="flex justify-center my-2">
      <img
        :src="pokemon.sprites?.artwork || pokemon.sprites?.front"
        :alt="`${capitalize(pokemon.name)} sprite`"
        class="w-32 h-32 object-contain"
        loading="lazy"
      />
    </div>

    <!-- Name -->
    <h2 class="text-center text-lg font-semibold text-gray-900 mb-2">
      {{ capitalize(pokemon.name) }}
    </h2>

    <!-- Type Tags -->
    <div class="flex justify-center gap-2 flex-wrap">
      <PokemonTypeTag
        v-for="type in pokemon.types"
        :key="type"
        :type="type"
        size="sm"
      />
    </div>
  </article>
</template>
