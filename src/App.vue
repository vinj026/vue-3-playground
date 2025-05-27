<script setup>
import { computed } from "vue";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const menuList = [
  {
    name: "Reactivity Basics",
    children: [
      { name: "Counter Button", path: "/counter" },
      { name: "Counter Button (Alt1)", path: "/counteralt1" },
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
  <div class="flex flex-col bg-background w-full h-screen justify-center px-24"
    :class="isCentered ? 'items-center' : 'items-start '">
    <router-view />

    <nav class="text-on-surface-variant text-bas mt-8 flex flex-col gap-2">
      <router-link to="/" class="font-bold text-on-surface-variant hover:underline">
        Home
      </router-link>

      <ul v-if="!hideOtherMenus">
        <li class="mb-4" v-for="item in menuList" :key="item.name">
          <template v-if="item.children">
            <span class="font-bold">{{ item.name }}</span>
            <ul class="ml-4">
              <li v-for="sub in item.children" :key="sub.path">
                <router-link :to="sub.path">{{ sub.name }}</router-link>
              </li>
            </ul>
          </template>
          <template v-else>
            <router-link class="font-bold" :to="item.path">{{
              item.name
              }}</router-link>
          </template>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped></style>
