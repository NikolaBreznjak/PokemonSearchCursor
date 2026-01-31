<script setup>
// Skeleton card for loading states
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-card p-4 animate-pulse"
    aria-hidden="true"
  >
    <!-- ID skeleton -->
    <div class="flex justify-end mb-2">
      <div class="h-4 w-12 bg-gray-200 rounded skeleton"></div>
    </div>

    <!-- Image skeleton -->
    <div class="w-32 h-32 mx-auto bg-gray-200 rounded-lg skeleton mb-4"></div>

    <!-- Name skeleton -->
    <div class="h-6 w-24 mx-auto bg-gray-200 rounded skeleton mb-3"></div>

    <!-- Type badges skeleton -->
    <div class="flex justify-center gap-2">
      <div class="h-6 w-16 bg-gray-200 rounded-full skeleton"></div>
      <div class="h-6 w-16 bg-gray-200 rounded-full skeleton"></div>
    </div>
  </div>
</template>
