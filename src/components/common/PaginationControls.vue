<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  maxVisiblePages: {
    type: Number,
    default: 5,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["page-change"]);

const visiblePages = computed(() => {
  const pages = [];
  const current = props.currentPage;
  const total = props.totalPages;
  const max = props.maxVisiblePages;

  if (total <= max) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    const half = Math.floor(max / 2);
    let start = current - half;
    let end = current + half;

    if (start < 1) {
      start = 1;
      end = max;
    }

    if (end > total) {
      end = total;
      start = total - max + 1;
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push("...");
      }
    }

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (end < total) {
      if (end < total - 1) {
        pages.push("...");
      }
      pages.push(total);
    }
  }

  return pages;
});

const goToPage = (page) => {
  if (typeof page === "number" && page !== props.currentPage && !props.disabled) {
    emit("page-change", page);
  }
};

const goToPrevious = () => {
  if (props.currentPage > 1 && !props.disabled) {
    emit("page-change", props.currentPage - 1);
  }
};

const goToNext = () => {
  if (props.currentPage < props.totalPages && !props.disabled) {
    emit("page-change", props.currentPage + 1);
  }
};
</script>

<template>
  <nav
    aria-label="Pagination"
    class="flex justify-center items-center gap-2"
  >
    <!-- Previous Button -->
    <button
      @click="goToPrevious"
      :disabled="currentPage === 1 || disabled"
      :aria-disabled="currentPage === 1 || disabled"
      class="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      aria-label="Go to previous page"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <!-- Page Numbers -->
    <div class="flex gap-1">
      <template v-for="(page, index) in visiblePages" :key="index">
        <span
          v-if="page === '...'"
          class="px-3 py-2 text-gray-400"
          aria-hidden="true"
        >
          ...
        </span>
        <button
          v-else
          @click="goToPage(page)"
          :disabled="disabled"
          :aria-current="page === currentPage ? 'page' : undefined"
          :class="[
            'min-w-[2.5rem] px-3 py-2 rounded-lg font-medium transition-colors',
            page === currentPage
              ? 'bg-pokemon-red text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-100 text-gray-700',
            disabled && 'opacity-50 cursor-not-allowed',
          ]"
        >
          {{ page }}
        </button>
      </template>
    </div>

    <!-- Next Button -->
    <button
      @click="goToNext"
      :disabled="currentPage === totalPages || disabled"
      :aria-disabled="currentPage === totalPages || disabled"
      class="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      aria-label="Go to next page"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </nav>
</template>
