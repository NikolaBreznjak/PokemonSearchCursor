<script setup>
import { computed } from "vue";
import { STAT_CONFIG, MAX_STAT_VALUE } from "../../utils/constants";
import { formatStatName, calculateStatPercentage } from "../../utils/formatters";

const props = defineProps({
  stats: {
    type: Array,
    required: true,
  },
});

const formattedStats = computed(() =>
  props.stats.map((stat) => ({
    ...stat,
    label: formatStatName(stat.name),
    percentage: calculateStatPercentage(stat.value, MAX_STAT_VALUE),
    color: STAT_CONFIG[stat.name]?.color || "#6B7280",
  }))
);

const totalStats = computed(() =>
  props.stats.reduce((sum, stat) => sum + stat.value, 0)
);
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-gray-900">Base Stats</h3>

    <div class="space-y-3">
      <div
        v-for="stat in formattedStats"
        :key="stat.name"
        class="flex items-center gap-3"
      >
        <!-- Stat Name -->
        <span class="text-sm font-medium text-gray-600 w-20 flex-shrink-0">
          {{ stat.label }}
        </span>

        <!-- Stat Value -->
        <span class="text-sm font-bold w-10 text-right flex-shrink-0">
          {{ stat.value }}
        </span>

        <!-- Stat Bar -->
        <div class="flex-grow h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full stat-bar"
            :style="{
              width: `${stat.percentage}%`,
              backgroundColor: stat.color,
            }"
            :aria-label="`${stat.label}: ${stat.value} out of ${MAX_STAT_VALUE}`"
          ></div>
        </div>
      </div>
    </div>

    <!-- Total -->
    <div class="flex items-center gap-3 pt-3 border-t border-gray-200">
      <span class="text-sm font-semibold text-gray-900 w-20">Total</span>
      <span class="text-sm font-bold w-10 text-right text-pokemon-blue">
        {{ totalStats }}
      </span>
    </div>
  </div>
</template>
