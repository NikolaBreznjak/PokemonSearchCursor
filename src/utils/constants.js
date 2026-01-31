/**
 * Pokémon type colors for type badges
 */
export const TYPE_COLORS = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

/**
 * Stat display names and colors
 */
export const STAT_CONFIG = {
  hp: { label: "HP", color: "#FF5959" },
  attack: { label: "Attack", color: "#F5AC78" },
  defense: { label: "Defense", color: "#FAE078" },
  "special-attack": { label: "Sp. Atk", color: "#9DB7F5" },
  "special-defense": { label: "Sp. Def", color: "#A7DB8D" },
  speed: { label: "Speed", color: "#FA92B2" },
};

/**
 * Maximum base stat value (used for calculating bar width)
 */
export const MAX_STAT_VALUE = 255;

/**
 * Items per page for pagination
 */
export const ITEMS_PER_PAGE = 20;

/**
 * Debounce delay for search input (ms)
 */
export const SEARCH_DEBOUNCE_MS = 300;

/**
 * Maximum autocomplete suggestions to show
 */
export const MAX_AUTOCOMPLETE_SUGGESTIONS = 8;
