<script setup>
import { ref, watch, computed } from "vue";
import Alert from "./Alert.vue";

const isShow = ref(false);
const alertType = ref({
  type: "",
});

const showAlert = (alertType_) => {
  alertType.value.type = alertType_;
  isShow.value = true;
};

const alertMsg = computed(() => {
  if (alertType.value.type == "Error") {
    return " this is error alert";
  } else if (alertType.value.type == "Success") {
    return "this is success alert";
  } else {
    return "this is info alert";
  }
});

watch(
  () => isShow.value,
  (newVal) => {
    if (newVal) {
      setTimeout(() => {
        isShow.value = false;
      }, 2000);
    }
  },
);
</script>

<template>
  <div class="flex gap-2">
    <button
      @click="showAlert('Error')"
      class="bg-error text-on-error px-4 py-2 rounded-xl shadow-md hover:bg-error/80 transition"
    >
      Show Error Alert
    </button>
    <button
      @click="showAlert('Success')"
      class="bg-primary text-on-primary px-4 py-2 rounded-xl shadow-md hover:bg-primary/80 transition"
    >
      Show Success Alert
    </button>
    <button
      @click="showAlert('Info')"
      class="bg-tertiary text-on-tertiary px-4 py-2 rounded-xl shadow-md hover:bg-tertiary/80 transition"
    >
      Show Info Alert
    </button>

    <!-- Transisi dipindah ke sini -->
    <transition name="fade-scale">
      <Alert v-if="isShow" :type="alertType.type">{{ alertMsg }}</Alert>
    </transition>
  </div>
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
