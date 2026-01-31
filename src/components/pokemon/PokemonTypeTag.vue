<script setup>
import { computed } from "vue";
import { TYPE_COLORS } from "../../utils/constants";
import { capitalize, getContrastColor } from "../../utils/formatters";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
});

const backgroundColor = computed(() => TYPE_COLORS[props.type] || "#A8A878");
const textColor = computed(() => getContrastColor(backgroundColor.value));
const displayName = computed(() => capitalize(props.type));

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};
</script>

<template>
  <span
    :class="['rounded-full font-medium inline-block', sizeClasses[size]]"
    :style="{ backgroundColor, color: textColor }"
    :aria-label="`${displayName} type`"
  >
    {{ displayName }}
  </span>
</template>
