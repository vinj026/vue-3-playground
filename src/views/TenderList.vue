<script setup>
import { ref, onMounted } from "vue";
import { Calendar, Building2, CircleDollarSign } from "lucide-vue-next";
const tenderList = ref(null);
const isLoading = ref(false);
const error = ref(null);

onMounted(async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const res = await fetch("https://tenders.guru");
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    tenderList.value = data.data.slice(0, 10);
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="w-7xl">
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-if="isLoading" class="col-span-full flex justify-center py-16">
        <div
          class="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"
        />
      </div>

      <div
        v-else-if="error"
        class="col-span-full text-error text-sm text-center"
      >
        {{ error }}
      </div>

      <TransitionGroup name="fade" tag="div" class="contents">
        <div
          v-for="tender in tenderList"
          :key="tender.id"
          class="p-4 rounded-xl bg-surface-container text-on-surface transition hover:bg-surface-container-high"
        >
          <h2 class="text-base font-semibold leading-tight mb-2 line-clamp-2">
            {{ tender.title }}
          </h2>
          <ul class="text-sm text-on-surface-variant space-y-1">
            <li class="flex items-center gap-2">
              <Calendar class="w-4" />
              {{ tender.date }}
            </li>
            <li class="flex items-center gap-2">
              <Building2 class="w-4" />
              {{ tender.awarded[0].suppliers[0].name }}
            </li>
            <li class="flex items-center gap-2 text-primary font-medium">
              <CircleDollarSign class="w-4 text-on-surface-variant" />
              {{ tender.awarded[0].value }}
              {{ tender.awarded_currency }}
            </li>
          </ul>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
