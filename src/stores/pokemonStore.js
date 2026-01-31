import { defineStore } from "pinia";
import { pokeApiService } from "../services/pokeApiService";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    // List State
    pokemonList: [],
    totalCount: 0,
    currentPage: 1,
    itemsPerPage: 20,

    // Search State
    searchQuery: "",
    allPokemonNames: [],

    // Detail State
    currentPokemon: null,

    // UI State
    isLoading: false,
    isLoadingDetail: false,
    error: null,

    // Cache
    pokemonCache: {},
  }),

  getters: {
    totalPages: (state) => Math.ceil(state.totalCount / state.itemsPerPage),

    offset: (state) => (state.currentPage - 1) * state.itemsPerPage,

    autocompleteSuggestions: (state) => {
      if (state.searchQuery.length < 2) return [];
      const query = state.searchQuery.toLowerCase();
      return state.allPokemonNames
        .filter(
          (p) => p.name.includes(query) || String(p.id).startsWith(query)
        )
        .slice(0, 8);
    },

    isPokemonCached: (state) => (id) => !!state.pokemonCache[id],
  },

  actions: {
    async fetchPokemonList(page = 1) {
      this.isLoading = true;
      this.error = null;
      this.currentPage = page;

      try {
        const offset = (page - 1) * this.itemsPerPage;
        const data = await pokeApiService.getPokemonList(
          this.itemsPerPage,
          offset
        );
        this.totalCount = data.count;

        // Fetch details for each pokemon to get sprites and types
        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const id = this.extractIdFromUrl(pokemon.url);
            // Check cache first
            if (this.pokemonCache[id]) {
              return this.pokemonCache[id];
            }
            const details = await pokeApiService.getPokemon(id);
            const formatted = this.formatPokemonData(details);
            this.pokemonCache[id] = formatted;
            return formatted;
          })
        );

        this.pokemonList = detailedPokemon;
      } catch (error) {
        this.error = error.message || "Failed to fetch Pokémon list";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchPokemonDetail(nameOrId) {
      this.isLoadingDetail = true;
      this.error = null;

      try {
        // Check cache first
        const cachedPokemon = Object.values(this.pokemonCache).find(
          (p) =>
            p.name.toLowerCase() === String(nameOrId).toLowerCase() ||
            p.id === Number(nameOrId)
        );

        if (cachedPokemon && cachedPokemon.abilities) {
          this.currentPokemon = cachedPokemon;
          this.isLoadingDetail = false;
          return;
        }

        const data = await pokeApiService.getPokemon(nameOrId);
        const formatted = this.formatPokemonData(data);

        // Fetch ability descriptions
        const abilitiesWithDescriptions = await Promise.all(
          data.abilities.map(async (ability) => {
            try {
              const abilityData = await pokeApiService.getAbility(
                ability.ability.name
              );
              const englishEntry = abilityData.effect_entries.find(
                (e) => e.language.name === "en"
              );
              return {
                name: ability.ability.name,
                isHidden: ability.is_hidden,
                description: englishEntry?.short_effect || "No description available.",
              };
            } catch {
              return {
                name: ability.ability.name,
                isHidden: ability.is_hidden,
                description: "No description available.",
              };
            }
          })
        );

        formatted.abilities = abilitiesWithDescriptions;
        this.currentPokemon = formatted;
        this.pokemonCache[formatted.id] = formatted;
      } catch (error) {
        if (error.message === "Pokémon not found") {
          this.error = `Pokémon "${nameOrId}" not found`;
        } else {
          this.error = error.message || "Failed to fetch Pokémon details";
        }
      } finally {
        this.isLoadingDetail = false;
      }
    },

    async fetchAllPokemonNames() {
      if (this.allPokemonNames.length > 0) return;

      try {
        this.allPokemonNames = await pokeApiService.getAllPokemonNames();
      } catch (error) {
        console.error("Failed to fetch Pokémon names for autocomplete:", error);
      }
    },

    setSearchQuery(query) {
      this.searchQuery = query;
    },

    setPage(page) {
      this.currentPage = page;
    },

    clearError() {
      this.error = null;
    },

    clearCurrentPokemon() {
      this.currentPokemon = null;
    },

    extractIdFromUrl(url) {
      const matches = url.match(/\/pokemon\/(\d+)\//);
      return matches ? parseInt(matches[1], 10) : null;
    },

    formatPokemonData(data) {
      return {
        id: data.id,
        name: data.name,
        height: data.height / 10, // Convert to meters
        weight: data.weight / 10, // Convert to kg
        types: data.types.map((t) => t.type.name),
        stats: data.stats.map((s) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
        sprites: {
          front: data.sprites.front_default,
          back: data.sprites.back_default,
          frontShiny: data.sprites.front_shiny,
          backShiny: data.sprites.back_shiny,
          artwork:
            data.sprites.other?.["official-artwork"]?.front_default ||
            data.sprites.front_default,
        },
        abilities: data.abilities.map((a) => ({
          name: a.ability.name,
          isHidden: a.is_hidden,
        })),
      };
    },
  },
});
