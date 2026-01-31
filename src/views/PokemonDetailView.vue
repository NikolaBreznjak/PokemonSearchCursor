<script setup>
import { computed, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePokemonStore } from "../stores/pokemonStore";
import PokemonDetail from "../components/pokemon/PokemonDetail.vue";
import LoadingSpinner from "../components/common/LoadingSpinner.vue";
import ErrorMessage from "../components/common/ErrorMessage.vue";
import { capitalize } from "../utils/formatters";

const route = useRoute();
const router = useRouter();
const store = usePokemonStore();

const nameOrId = computed(() => route.params.nameOrId);
const pokemon = computed(() => store.currentPokemon);
const isLoading = computed(() => store.isLoadingDetail);
const error = computed(() => store.error);

// Update document title when pokemon loads
watch(pokemon, (newPokemon) => {
  if (newPokemon) {
    document.title = `${capitalize(newPokemon.name)} - PokéSearch`;
  }
});

// Fetch pokemon when route param changes
watch(
  nameOrId,
  (newValue) => {
    if (newValue) {
      store.fetchPokemonDetail(newValue);
    }
  },
  { immediate: true }
);

const handleRetry = () => {
  store.clearError();
  store.fetchPokemonDetail(nameOrId.value);
};

const handleBack = () => {
  router.back();
};

const handleGoHome = () => {
  router.push("/");
};

// Clean up on unmount
onUnmounted(() => {
  store.clearError();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Back Button -->
    <button
      @click="handleBack"
      class="mb-6 flex items-center gap-2 text-pokemon-blue hover:text-blue-700 font-medium transition-colors"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back
    </button>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center py-20">
      <LoadingSpinner size="lg" text="Loading Pokémon..." />
    </div>

    <!-- Error State -->
    <ErrorMessage
      v-else-if="error"
      :message="error"
      :retryable="true"
      @retry="handleRetry"
    >
      <template #action>
        <button
          @click="handleGoHome"
          class="mt-4 px-6 py-2 bg-pokemon-blue text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          Go to Home
        </button>
      </template>
    </ErrorMessage>

    <!-- Pokemon Detail -->
    <PokemonDetail v-else-if="pokemon" :pokemon="pokemon" />
  </div>
</template>
