const BASE_URL = "https://pokeapi.co/api/v2";
const TIMEOUT = 10000; // 10 seconds

/**
 * Fetch with timeout wrapper
 */
async function fetchWithTimeout(url, timeout = TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw error;
  }
}

export const pokeApiService = {
  /**
   * Fetch paginated list of Pokémon
   * @param {number} limit - Number of items per page
   * @param {number} offset - Starting offset
   * @returns {Promise<{count: number, results: Array}>}
   */
  async getPokemonList(limit = 20, offset = 0) {
    const response = await fetchWithTimeout(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon list");
    }

    return response.json();
  },

  /**
   * Fetch single Pokémon by name or ID
   * @param {string|number} nameOrId - Pokémon name or ID
   * @returns {Promise<Object>} - Full Pokémon data
   */
  async getPokemon(nameOrId) {
    const identifier = String(nameOrId).toLowerCase();
    const response = await fetchWithTimeout(`${BASE_URL}/pokemon/${identifier}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Pokémon not found");
      }
      throw new Error("Failed to fetch Pokémon");
    }

    return response.json();
  },

  /**
   * Fetch Pokémon species info (for descriptions, evolution)
   * @param {number} id - Pokémon ID
   * @returns {Promise<Object>} - Species data
   */
  async getPokemonSpecies(id) {
    const response = await fetchWithTimeout(`${BASE_URL}/pokemon-species/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch species info");
    }

    return response.json();
  },

  /**
   * Fetch ability details
   * @param {string} name - Ability name
   * @returns {Promise<Object>} - Ability data with descriptions
   */
  async getAbility(name) {
    const response = await fetchWithTimeout(`${BASE_URL}/ability/${name}`);

    if (!response.ok) {
      throw new Error("Failed to fetch ability info");
    }

    return response.json();
  },

  /**
   * Fetch all Pokémon names for autocomplete (cached on first call)
   * @returns {Promise<Array<{name: string, id: number}>>}
   */
  async getAllPokemonNames() {
    const response = await fetchWithTimeout(`${BASE_URL}/pokemon?limit=1500`);

    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon names");
    }

    const data = await response.json();
    return data.results.map((p, index) => ({
      name: p.name,
      id: index + 1,
    }));
  },
};
