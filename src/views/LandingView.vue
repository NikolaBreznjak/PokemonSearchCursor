<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { usePokemonStore } from "../stores/pokemonStore";
import PokemonTypeTag from "../components/pokemon/PokemonTypeTag.vue";
import { capitalize, formatPokemonId } from "../utils/formatters";

const router = useRouter();
const store = usePokemonStore();

const searchQuery = ref("");
const featuredPokemon = ref([]);
const isLoading = ref(true);

// Featured Pokémon IDs (iconic starters and popular ones)
const featuredIds = [25, 1, 4, 7, 150, 149];

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/pokemon/${searchQuery.value.trim().toLowerCase()}`);
  }
};

const goToBrowse = () => {
  router.push("/browse");
};

const goToPokemon = (name) => {
  router.push(`/pokemon/${name}`);
};

onMounted(async () => {
  // Fetch featured Pokémon
  try {
    const promises = featuredIds.map(async (id) => {
      if (store.pokemonCache[id]) {
        return store.pokemonCache[id];
      }
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      return {
        id: data.id,
        name: data.name,
        types: data.types.map((t) => t.type.name),
        sprite: data.sprites.other?.["official-artwork"]?.front_default || data.sprites.front_default,
      };
    });
    featuredPokemon.value = await Promise.all(promises);
  } catch (error) {
    console.error("Failed to fetch featured Pokémon:", error);
  } finally {
    isLoading.value = false;
  }

  // Prefetch names for autocomplete
  store.fetchAllPokemonNames();
});
</script>

<template>
  <div class="min-h-[calc(100vh-140px)]">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-pokemon-red via-red-600 to-red-700 text-white overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-64 h-64 rounded-full border-8 border-white"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 rounded-full border-8 border-white"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-8 border-white"></div>
      </div>

      <div class="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <!-- Logo -->
          <div class="flex justify-center mb-6">
            <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <svg class="w-16 h-16" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="#CC0000" stroke="#1a1a1a" stroke-width="4"/>
                <rect x="0" y="47" width="100" height="6" fill="#1a1a1a"/>
                <circle cx="50" cy="50" r="48" fill="white" clip-path="url(#hero-bottom)"/>
                <defs>
                  <clipPath id="hero-bottom">
                    <rect x="0" y="50" width="100" height="50"/>
                  </clipPath>
                </defs>
                <circle cx="50" cy="50" r="16" fill="white" stroke="#1a1a1a" stroke-width="4"/>
                <circle cx="50" cy="50" r="8" fill="#1a1a1a"/>
              </svg>
            </div>
          </div>

          <!-- Title -->
          <h1 class="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            PokéSearch
          </h1>
          <p class="text-xl md:text-2xl text-white/90 mb-8 max-w-xl mx-auto">
            Discover and explore over 1,000 Pokémon with detailed stats, abilities, and more
          </p>

          <!-- Search Bar -->
          <div class="max-w-xl mx-auto mb-8">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search Pokémon by name or ID..."
                class="w-full px-6 py-4 pl-14 rounded-full text-gray-900 text-lg shadow-xl focus:outline-none focus:ring-4 focus:ring-pokemon-yellow"
                @keydown.enter="handleSearch"
              />
              <svg
                class="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <button
                @click="handleSearch"
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-pokemon-yellow hover:bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-full transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          <!-- CTA Button -->
          <button
            @click="goToBrowse"
            class="inline-flex items-center gap-2 bg-white text-pokemon-red font-bold px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Browse All Pokémon
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Wave Divider -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F3F4F6"/>
        </svg>
      </div>
    </section>

    <!-- Featured Pokémon Section -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-4">
          Featured Pokémon
        </h2>
        <p class="text-gray-600 text-center mb-10 max-w-xl mx-auto">
          Meet some of the most iconic Pokémon from across all generations
        </p>

        <!-- Featured Grid -->
        <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div
            v-for="n in 6"
            :key="n"
            class="bg-white rounded-xl p-4 shadow-card animate-pulse"
          >
            <div class="w-20 h-20 mx-auto bg-gray-200 rounded-full mb-3"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <button
            v-for="pokemon in featuredPokemon"
            :key="pokemon.id"
            @click="goToPokemon(pokemon.name)"
            class="bg-white rounded-xl p-4 shadow-card hover:shadow-card-hover transform hover:-translate-y-1 transition-all duration-200 text-center group"
          >
            <div class="w-20 h-20 mx-auto mb-3 relative">
              <img
                :src="pokemon.sprite"
                :alt="pokemon.name"
                class="w-full h-full object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <p class="font-semibold text-gray-900 mb-1">
              {{ capitalize(pokemon.name) }}
            </p>
            <p class="text-xs text-gray-400 mb-2">
              {{ formatPokemonId(pokemon.id) }}
            </p>
            <div class="flex justify-center gap-1 flex-wrap">
              <PokemonTypeTag
                v-for="type in pokemon.types"
                :key="type"
                :type="type"
                size="sm"
              />
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything You Need
        </h2>

        <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <!-- Feature 1 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-pokemon-yellow/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-pokemon-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Smart Search</h3>
            <p class="text-gray-600">
              Search by name or Pokédex number with instant autocomplete suggestions
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-pokemon-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-pokemon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Detailed Stats</h3>
            <p class="text-gray-600">
              View base stats, abilities, types, and physical characteristics
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-pokemon-red/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-pokemon-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Sprite Gallery</h3>
            <p class="text-gray-600">
              Browse official artwork and sprite variants including shiny forms
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Banner -->
    <section class="bg-gradient-to-r from-pokemon-blue to-blue-600 py-12 text-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p class="text-4xl font-bold mb-1">1000+</p>
            <p class="text-white/80">Pokémon</p>
          </div>
          <div>
            <p class="text-4xl font-bold mb-1">18</p>
            <p class="text-white/80">Types</p>
          </div>
          <div>
            <p class="text-4xl font-bold mb-1">300+</p>
            <p class="text-white/80">Abilities</p>
          </div>
          <div>
            <p class="text-4xl font-bold mb-1">9</p>
            <p class="text-white/80">Generations</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
