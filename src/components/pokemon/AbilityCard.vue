<script setup>
import { capitalize } from "../../utils/formatters";

const props = defineProps({
  ability: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="p-4 bg-gray-50 rounded-lg border border-gray-200"
  >
    <div class="flex items-center gap-2 mb-2">
      <h4 class="font-semibold text-gray-900">
        {{ capitalize(ability.name) }}
      </h4>
      <span
        v-if="ability.isHidden"
        class="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium"
      >
        Hidden
      </span>
    </div>
    <p class="text-sm text-gray-600">
      {{ ability.description }}
    </p>
  </div>
</template>
