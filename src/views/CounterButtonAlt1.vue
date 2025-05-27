<script setup>
import { ref, watch } from "vue";
const count = ref(0);
const isPopping = ref(false);
const incrementCount = () => {
  count.value++;
};

watch(count, () => {
  isPopping.value = true;
  setTimeout(() => (isPopping.value = false), 300);
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-6 p-12 rounded-xl text-on-primary font-sans max-w-md mx-auto w-full bg-surface">
    <button @click="count++"
      class="px-6 py-3 text-base font-bold rounded-lg shadow-md transition-all duration-300 cursor-pointer bg-primary text-on-primary shadow-primary/30 hover:bg-primary-hover hover:shadow-primary/50 active:translate-y-0">
      Click Me!
    </button>

    <p class="text-lg font-medium transition-colors duration-400 text-on-surface">
      Clicked:
      <span :class="[
        'inline-block transition-transform duration-300',
        isPopping ? 'animate-pop' : '',
      ]">
        {{ count }}
      </span>
    </p>
  </div>
</template>

<style scoped>
@keyframes pop {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.animate-pop {
  animation: pop 0.3s ease-in-out;
}
</style>
