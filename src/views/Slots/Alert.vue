<script setup>
import { computed } from "vue";
import { CircleX } from "lucide-vue-next";
const props = defineProps({
  type: {
    type: String,
    default: "info",
  },
});

const alertType = computed(() => {
  return `alert-${props.type}`;
});
</script>

<template>
  <div
    :class="[
      ' absolute bottom-10 right-10  p-4 rounded-2xl ',
      { 'bg-primary text-on-primary': props.type === 'Success' },
      { 'bg-error text-on-error': props.type === 'Error' },
      { 'bg-tertiary text-on-tertiary': props.type === 'Info' },
    ]"
  >
    <div :class="['flex', 'gap-2']">
      <CircleX />
      <slot></slot>
    </div>
  </div>
</template>
