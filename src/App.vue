<script setup>
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const menuList = [
  {
    name: "Reactivity Basics",
    children: [
      { name: "Counter Button", path: "/counter" },
      { name: "Counter Button (Alt1)", path: "/counteralt1" },
    ],
  },
  {
    name: "Components & Communication",
    children: [
      { name: "Todo List", path: "/todolist" },
      { name: "User Card", path: "/usercard" },
    ],
  },
  {
    name: "State Management & Advanced Reactivity",
    children: [
      { name: "Filterable Product", path: "/filterableproduct" },
      { name: "Tender List Api", path: "/tenderlist" },
    ],
  },
];

const route = useRoute();
const hideOtherMenus = ref(false);

const isCentered = computed(() => {
  return route.path !== "/" && route.meta.centeredLayout === true;
});

watchEffect(() => {
  hideOtherMenus.value = route.meta.hideOtherMenus === true;
});
</script>

<template>
  <div
    class="min-h-screen w-full bg-background text-on-surface flex flex-col items-center justify-center px-6 py-12 transition-all"
    :class="isCentered ? 'justify-center' : 'justify-start pt-24'">
    <router-view />

    <nav v-if="!hideOtherMenus" class="w-full max-w-xl mt-12 animate-fade-in">
      <ul class="space-y-6">
        <li v-for="item in menuList" :key="item.name">
          <p class="text-sm font-medium text-on-surface-variant mb-1">
            {{ item.name }}
          </p>
          <ul class="space-y-1 pl-4 border-l border-outline">
            <li v-for="sub in item.children" :key="sub.path">
              <router-link :to="sub.path" class="text-sm hover:text-primary transition-colors">
                {{ sub.name }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <div v-if="route.path !== '/'" class="w-full max-w-xl mt-10">
      <router-link to="/" class="block mt-10 text-xs text-on-surface-variant hover:text-primary transition">
        ← Back to Home
      </router-link>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.4s ease-out both;
}
</style>
