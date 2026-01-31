/**
 * Capitalize first letter of each word
 * @param {string} str - Input string
 * @returns {string} - Capitalized string
 */
export function capitalize(str) {
  if (!str) return "";
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Format Pokémon ID with leading zeros
 * @param {number} id - Pokémon ID
 * @returns {string} - Formatted ID (e.g., "#025")
 */
export function formatPokemonId(id) {
  return `#${String(id).padStart(3, "0")}`;
}

/**
 * Format height from decimeters to meters
 * @param {number} height - Height in decimeters
 * @returns {string} - Formatted height (e.g., "0.4 m")
 */
export function formatHeight(height) {
  return `${height.toFixed(1)} m`;
}

/**
 * Format weight from hectograms to kilograms
 * @param {number} weight - Weight in hectograms
 * @returns {string} - Formatted weight (e.g., "6.0 kg")
 */
export function formatWeight(weight) {
  return `${weight.toFixed(1)} kg`;
}

/**
 * Format stat name for display
 * @param {string} statName - API stat name (e.g., "special-attack")
 * @returns {string} - Display name (e.g., "Sp. Atk")
 */
export function formatStatName(statName) {
  const statNames = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };
  return statNames[statName] || capitalize(statName);
}

/**
 * Calculate stat bar percentage
 * @param {number} value - Stat value
 * @param {number} max - Maximum stat value (default 255)
 * @returns {number} - Percentage (0-100)
 */
export function calculateStatPercentage(value, max = 255) {
  return Math.min(100, (value / max) * 100);
}

/**
 * Get contrasting text color for a background
 * @param {string} hexColor - Hex color code
 * @returns {string} - "white" or "black"
 */
export function getContrastColor(hexColor) {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#1F2937" : "#FFFFFF";
}
