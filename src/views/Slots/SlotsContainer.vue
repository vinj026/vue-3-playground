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
      }, 1000);
    }
  },
);
</script>

<template>
  <div class="flex gap-2">
    <button
      @click="showAlert('Error')"
      class="bg-error text-on-error p-2 rounded-xl hover:cursor-pointer hover:bg-error/80"
    >
      Show Error Alert
    </button>
    <button
      @click="showAlert('Success')"
      class="bg-primary text-on-primary p-2 rounded-xl hover:cursor-pointer hover:bg-primary/80"
    >
      Show Success Alert
    </button>
    <button
      @click="showAlert('Info')"
      class="bg-tertiary text-on-tertiary p-2 rounded-xl hover:cursor-pointer hover:bg-tertiary/80"
    >
      Show Info Alert
    </button>

    <Alert v-if="isShow" :type="alertType.type">{{ alertMsg }}</Alert>
  </div>
</template>
