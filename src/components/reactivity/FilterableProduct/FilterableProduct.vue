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
  <div class="productContainer">
    <div class="searchfilterContainer">
      <input type="text" v-model="usrSearch" />
      <label class="custom-checkbox">
        <input type="checkbox" v-model="usrChecked" />
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="itemContainer">
      <p v-if="filteredProducts.length === 0">No Product Here</p>
      <ul v-else>
        <li v-for="product in filteredProducts" :key="product.id">
          <p>{{ product.name }}</p>
          <p>${{ product.price }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
.productContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 250px;
}

.searchfilterContainer {
  display: flex;
  padding: 8px;
  gap: 8px;
  box-sizing: border-box;
}

.itemContainer {
  display: flex;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

ul {
  width: 100%;
  padding: 0;
}

li {
  display: flex;
  list-style: none;
  width: 100%;
  justify-content: space-between;
}

input[type="text"] {
  width: 100%;
  border-radius: 3px;
  padding: 4px 8px;
  border: none;
  outline: none;
  font-size: 1rem;
  background-color: #2d2d2d;
  color: #ffffff;
  transition: all 0.3s ease;
}

input[type="text"]:focus {
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.3);
}

.custom-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  font-size: 1rem;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: relative;
  height: 25px;
  width: 25px;
  transition: background-color 0.3s ease;
  background-color: #eee;
  border-radius: 4px;
}

/* When checked, add a blue background */
.custom-checkbox input:checked~.checkmark {
  background-color: #42b9a1;
  transition: background-color 0.3s ease;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.custom-checkbox input:checked~.checkmark:after {
  display: block;
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
