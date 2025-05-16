<script setup>
import { reactive, ref, onMounted, computed, watch } from "vue";

const user = reactive({
  name: "Tejo",
  avatar: "https://avatar.iran.liara.run/public",
  lastActive: null,
  status: "Online",
  updateStatus() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const _date = String(date.getDate()).padStart(2, "0");
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    user.lastActive = `${_date}-${month}-${year}T${hour}:${minute}:${second}`;
  },
});

const convertTimeStrtoInt = () => {
  const timeStr_ = user.lastActive.split("T")[1];
  const [h, m, s] = timeStr_.split(":").map(Number);
  return m * 60 + s;
};

let firstMinutesOnline;
onMounted(() => {
  user.updateStatus();
  firstMinutesOnline = convertTimeStrtoInt();
  setTimeout(() => {
    user.updateStatus();
  }, 10000);
});

const statusCounter = computed(() => {
  const lastMinutesOnline = convertTimeStrtoInt();
  const endTime = 10;

  lastMinutesOnline - firstMinutesOnline === endTime
    ? (user.status = "Offline")
    : (user.status = "Online");

  return lastMinutesOnline;
});

watch(
  () => user.lastActive,
  () => {
    console.log(`First Min: ${firstMinutesOnline}`);
    console.log(`Last Min: ${statusCounter.value}`);
  },
);
</script>

<template>
  <div class="cardContainer">
    <div class="profilepicContainer">
      <img :src="user.avatar" width="20%" />
      <p class="Name">Tejo</p>
      <p :class="user.status">{{ user.status }}</p>
    </div>
  </div>
</template>

<style lang="css" scoped>
p.Online {
  color: #42b9a1;
}

p.Offline {
  color: grey;
}
</style>
