<script setup>
import { ref } from "vue";
const count = ref(0);
</script>

<template>
  <div class="container">
    <button @click="count++" class="btn">Click Me!</button>
    <p class="counter">
      Clicked: <span class="counter-number">{{ count }}</span>
    </p>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 48px 24px;
  border-radius: 16px;
  color: white;
  font-family: "Segoe UI", sans-serif;
  width: 100%;
  max-width: 400px;
  margin: auto;
}

.btn {
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #42b983;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.3);
}

.btn:hover {
  background-color: #36986d;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(66, 185, 131, 0.4);
}

.btn:active {
  transform: translateY(0);
}

.counter {
  font-size: 1.5rem;
  font-weight: 500;
  transition: color 0.4s ease;
}

.counter-number {
  display: inline-block;
  transition: transform 0.3s ease;
}

/* Efek ketika angka bertambah */
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

.counter.pop {
  animation: pop 0.3s ease-in-out;
}
</style>
