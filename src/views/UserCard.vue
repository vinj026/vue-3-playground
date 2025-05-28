<script setup>
import { reactive, ref, onMounted, onUnmounted, computed, watch } from "vue";
import { CircleDot } from "lucide-vue-next";

const user = reactive({
  name: "Tejo",
  avatar: "https://avatar.iran.liara.run/public",
  lastActive: null,
  status: "on",
  updateStatus() {
    this.lastActive = Date.now();
    this.status = "on";
  },
});

let timerInactive;
let timerTick;

const interaction = reactive({});
const handleInteraction = (type, event) => {
  interaction.Eventtype = type;
  interaction.xy = `${event.x} : ${event.y}`;
  user.updateStatus();
  clearTimeout(timerInactive);
  timerInactive = setTimeout(() => {
    user.status = "off";
  }, 1000);
};

const lastSeen = ref("-");
const updateLastSeen = () => {
  if (!user.lastActive) {
    lastSeen.value = "-";
    return;
  }
  const diff = Math.floor((Date.now() - user.lastActive) / 1000);
  if (diff < 60) {
    lastSeen.value = `${diff}s`;
  } else if (diff < 3600) {
    lastSeen.value = `${Math.floor(diff / 60)}m`;
  } else {
    lastSeen.value = `${Math.floor(diff / 3600)}h`;
  }
};

const handleInteractionClick = (e) => handleInteraction("click", e);
const handleInteractionMove = (e) => handleInteraction("mousemove", e);

onMounted(() => {
  user.updateStatus();
  window.addEventListener("click", handleInteractionClick);
  window.addEventListener("mousemove", handleInteractionMove);
  updateLastSeen();
  timerTick = setInterval(updateLastSeen, 1000);
});

onUnmounted(() => {
  window.removeEventListener("click", handleInteractionClick);
  window.removeEventListener("mousemove", handleInteractionMove);
  clearInterval(timerTick);
});

watch(user, () => {
  console.log(`Last Active ${user.lastActive}`);
});
</script>

<template>
  <div
    class="flex gap-4 bg-surface-container text-on-surface rounded-xl p-4 items-center justify-center"
  >
    <img :src="user.avatar" width="75px" />
    <div class="flex flex-col justify-center gap-2 h-full">
      <div class="flex w-full gap-16 justify-between">
        <p class="text-xl">{{ user.name }}</p>
        <div
          class="flex items-center justify-center gap-2 border-1 px-2 h-fit rounded-full transition-all duration-500"
          :class="
            user.status === 'on'
              ? 'text-primary border-primary bg-primary/10'
              : 'text-outline border-outline bg-transparent'
          "
        >
          <CircleDot class="w-3 status-dot" />
          <p class="text-xs transition-colors duration-500">
            {{ user.status }}
          </p>
        </div>
      </div>
      <p class="text-sm text-outline">Last seen: {{ lastSeen }}</p>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.status-dot {
  animation: pulse 1.5s infinite;
}
</style>
