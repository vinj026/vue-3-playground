<script setup>
import { ref, onMounted } from "vue";

const tenderList = ref(null);
const isLoading = ref(false);
const error = ref(null);

onMounted(async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const res = await fetch("/api/tenders");
    if (!res.ok) {
      throw new Error(res.message);
    } else {
      const data = await res.json();
      console.log(data);
      tenderList.value = data.data.slice(0, 10);
      console.log(tenderList.value);
    }
  } catch (err) {
    console.log(`error ${err.message}`);
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="tenderListContainer">
    <div v-if="isLoading" class="isLoading">
      <div class="loader"></div>
    </div>
    <div v-else-if="error">
      <p style="color: red">Error: {{ error }}</p>
    </div>
    <div v-else class="tenderCard" v-for="tender in tenderList" :key="tender.id">
      <p>📄 {{ tender.title }}</p>
      <p>📅 {{ tender.date }}</p>
      <p>🏢 {{ tender.awarded[0].suppliers[0].name }}</p>
      <p>💰 {{ tender.awarded[0].value }} {{ tender.awarded_currency }}</p>
    </div>
  </div>
</template>

<style lang="css" scoped>
.tenderListContainer {
  gap: 8px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.isLoading {
  grid-column: 1 / span 3;
}

.tenderCard {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 450px;
  padding: 16px;
  overflow: hidden;
  text-align: left;
}

.tenderCard p {
  padding: 0;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.loader {
  width: 50px;
  aspect-ratio: 1;
  --_c: no-repeat radial-gradient(farthest-side, #fff 92%, #0000);
  background:
    var(--_c) top,
    var(--_c) left,
    var(--_c) right,
    var(--_c) bottom;
  background-size: 12px 12px;
  animation: l7 1s infinite;
}

@keyframes l7 {
  to {
    transform: rotate(0.5turn);
  }
}
</style>
