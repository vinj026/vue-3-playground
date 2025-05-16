<script setup>
import { reactive, ref, onMounted, computed, watch } from "vue";

const user = reactive({
  name: "Tejo",
  avatar: "https://avatar.iran.liara.run/public",
  lastActive: null,
  status: "Online",
  updateStatus() {
    user.lastActive = Date.now();
  },
});

let timerInactive;
const interaction = reactive({});
const handleInteraction = (type, event) => {
  interaction.Eventtype = type;
  interaction.xy = `${event.x} : ${event.y}`;
  user.updateStatus();
  clearTimeout(timerInactive);
  timerInactive = setTimeout(() => {
    user.status = "Offline";
  }, 5000);
};

onMounted(() => {
  user.updateStatus();
  window.addEventListener("click", (e) => handleInteraction("click", e));
  window.addEventListener("mousemove", (e) =>
    handleInteraction("mousemove", e),
  );
});

watch(user, () => {
  console.log(`Last Active ${user.lastActive}`);
});
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
