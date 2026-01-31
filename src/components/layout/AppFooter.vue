<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-gray-800 text-gray-300 py-6 mt-auto" role="contentinfo">
    <div class="container mx-auto px-4 text-center">
      <p class="text-sm">
        Powered by
        <a
          href="https://pokeapi.co/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-pokemon-yellow hover:underline font-medium"
        >
          PokéAPI
        </a>
      </p>
      <p class="text-xs mt-2 text-gray-400">
        &copy; {{ currentYear }} PokéSearch. Pokémon and Pokémon character names are trademarks of Nintendo.
      </p>
    </div>
  </footer>
</template>
