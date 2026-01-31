import { ref, watch } from "vue";

/**
 * Creates a debounced ref that updates after a delay
 * @param {any} initialValue - Initial value for the ref
 * @param {number} delay - Debounce delay in milliseconds
 * @returns {import('vue').Ref} - Debounced ref
 */
export function useDebouncedRef(initialValue, delay = 300) {
  const value = ref(initialValue);
  const debouncedValue = ref(initialValue);
  let timeoutId = null;

  watch(
    value,
    (newValue) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        debouncedValue.value = newValue;
      }, delay);
    },
    { immediate: false }
  );

  return {
    value,
    debouncedValue,
  };
}
