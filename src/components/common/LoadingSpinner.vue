<script setup>
const props = defineProps({
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  text: {
    type: String,
    default: "",
  },
});

const sizeClasses = {
  sm: "w-6 h-6 border-2",
  md: "w-10 h-10 border-3",
  lg: "w-16 h-16 border-4",
};
</script>

<template>
  <div class="flex flex-col items-center gap-3" role="status" aria-live="polite">
    <div
      :class="[
        'rounded-full border-gray-200 border-t-pokemon-red animate-spin',
        sizeClasses[size],
      ]"
      aria-hidden="true"
    ></div>
    <span v-if="text" class="text-gray-600 font-medium">{{ text }}</span>
    <span v-else class="sr-only">Loading...</span>
  </div>
</template>

<style scoped>
.border-3 {
  border-width: 3px;
}
</style>
