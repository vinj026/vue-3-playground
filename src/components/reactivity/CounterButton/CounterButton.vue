<script setup>
import { ref } from "vue";
const count = ref(0);
</script>

<template>
  <div>
    <button @click="count++">Click Me!</button>
    <p>Clicked: {{ count }}</p>
  </div>
</template>

<style lang="css" scoped>
div {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
</style>
