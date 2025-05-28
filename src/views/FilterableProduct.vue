<script setup>
import { reactive, ref, computed, watch } from "vue";
const products = reactive([
  { id: 1, name: "Laptop", price: 1500, inStock: true },
  { id: 2, name: "Mouse", price: 50, inStock: false },
  { id: 3, name: "Keyboard", price: 100, inStock: true },
]);

const usrChecked = ref(false);
const usrSearch = ref("");

const filteredProducts = computed(() => {
  return products.filter((product) => {
    const matchusrChecked = usrChecked.value ? product.inStock : true;

    const matchusrSearch = product.name
      .toLowerCase()
      .includes(usrSearch.value.toLowerCase());

    return matchusrSearch && matchusrChecked;
  });
});

watch(filteredProducts, () => {
  console.log("searchProduct:", filteredProducts.value);
});
</script>

<template>
  <div
    class="flex flex-col w-m-xl min-h-[250px] rounded-2xl bg-surface-container text-on-surface shadow-lg overflow-hidden"
  >
    <div class="flex items-center gap-4 px-5 py-4 bg-surface-container-high">
      <input
        type="text"
        v-model="usrSearch"
        class="flex-1 px-4 py-2 rounded-xl bg-surface text-on-surface placeholder-on-surface-variant text-base outline-none transition focus:ring-2 focus:ring-primary/50"
        placeholder=" Search products..."
      />
      <label class="flex items-center gap-3 text-sm cursor-pointer select-none">
        <span class="text-on-surface-variant font-medium">In Stock</span>
        <div class="relative">
          <input type="checkbox" v-model="usrChecked" class="sr-only" />
          <div
            class="block w-11 h-6 rounded-full transition-colors duration-300"
            :class="usrChecked ? 'bg-primary' : 'bg-surface-variant'"
          ></div>
          <div
            class="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300"
            :class="usrChecked ? 'translate-x-5' : ''"
          ></div>
        </div>
      </label>
    </div>

    <div class="flex flex-col w-full px-5 py-4">
      <p
        v-if="filteredProducts.length === 0"
        class="text-on-surface-variant text-sm"
      >
        No Product Found
      </p>
      <ul v-else class="w-full ">
        <li
          v-for="product in filteredProducts"
          :key="product.id"
          class="flex justify-between items-center py-3"
        >
          <span class="text-base font-medium text-on-surface">
            {{ product.name }}
          </span>
          <span class="text-primary font-semibold">${{ product.price }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
