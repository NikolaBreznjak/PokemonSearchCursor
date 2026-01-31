<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  retryable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["retry"]);

const handleRetry = () => {
  emit("retry");
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center py-12 px-4 text-center"
    role="alert"
    aria-live="assertive"
  >
    <!-- Error Icon -->
    <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
      <svg
        class="w-10 h-10 text-pokemon-red"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    </div>

    <!-- Error Message -->
    <h2 class="text-xl font-semibold text-gray-900 mb-2">
      Something went wrong
    </h2>
    <p class="text-gray-600 max-w-md mb-6">
      {{ message }}
    </p>

    <!-- Retry Button -->
    <button
      v-if="retryable"
      @click="handleRetry"
      class="px-6 py-2 bg-pokemon-red text-white rounded-full font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pokemon-red focus:ring-offset-2"
    >
      Try Again
    </button>

    <!-- Additional actions slot -->
    <slot name="action"></slot>
  </div>
</template>
