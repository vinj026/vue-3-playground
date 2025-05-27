<script setup>
import { reactive, watch } from "vue";
import { X, CircleAlert } from "lucide-vue-next";

const todo = reactive([]);
const usrInput = reactive({
  input: "",
  isDisabled: true,
  isSametask: null,
});

watch(usrInput, (newVal) => {
  newVal.input.trim() === ""
    ? (newVal.isDisabled = true)
    : (newVal.isDisabled = false);
});

const handleSubmit = () => {
  if (todo.length > 0) {
    const duplicateCheck = todo.some(
      (item) =>
        item.task.toLowerCase().replace(/\s+/g, "") ===
        usrInput.input.toLowerCase().replace(/\s+/g, ""),
    );
    if (!duplicateCheck) {
      todo.push({
        id: todo.length + 1,
        task: usrInput.input,
        isDone: false,
      });
      usrInput.input = "";
      usrInput.isSametask = false;
    } else {
      usrInput.isSametask = true;
      setTimeout(() => {
        usrInput.isSametask = false;
      }, 2000);
    }
  } else {
    todo.push({
      id: todo.length + 1,
      task: usrInput.input,
      isDone: false,
    });
    usrInput.input = "";
    usrInput.isSametask = false;
  }
};

const handleRemove = (id) => {
  const index = todo.findIndex((item) => item.id === id);
  if (index > -1) {
    todo.splice(index, 1);
  }
};
</script>

<template>
  <div
    class="relative grid grid-rows-[auto_1fr] box-border w-[450px] min-h-[45vh] h-[50vh] p-4 rounded-xl bg-surface-container font-sans text-on-surface"
  >
    <div class="flex gap-3 mb-4 items-start">
      <input
        type="text"
        name="userInput"
        v-model="usrInput.input"
        placeholder="Add a new task..."
        class="flex-1 px-3 py-2 rounded-md text-on-surface text-base outline-none bg-surface placeholder-on-surface-variant transition focus:ring-2 focus:ring-primary"
      />
      <button
        :disabled="usrInput.isDisabled"
        @click="handleSubmit"
        class="px-4 py-2 rounded-md font-bold text-on-primary bg-primary transition-transform duration-150 disabled:bg-surface-variant disabled:text-on-surface-variant disabled:cursor-not-allowed hover:bg-primary/90 hover:cursor-pointer active:translate-y-0 hover:-translate-y-0.5 shadow-md"
      >
        Submit
      </button>
    </div>

    <div
      class="flex flex-col gap-3 w-full bg-surface-container overflow-y-auto max-h-[calc(75vh-120px)] rounded-lg scrollbar-thin scrollbar-thumb-outline scrollbar-track-surface"
    >
      <div
        v-for="item in todo"
        :key="item.id"
        class="flex justify-between items-center p-2 transition-transform animate-fadeIn"
      >
        <span class="max-w-[calc(100%-40px)] truncate text-on-surface text-md">
          {{ item.task }}
        </span>
        <button
          @click="handleRemove(item.id)"
          class="bg-transparent cursor-pointer transition-transform hover:scale-125 text-on-surface-variant"
        >
          <X width="16" height="16" />
        </button>
      </div>
    </div>
  </div>

  <transition name="toast">
    <div
      v-if="usrInput.isSametask === true"
      class="absolute top-4 right-4 bg-error p-4 rounded-lg shadow-lg text-on-error text-sm"
    >
      <div class="flex gap-2 items-center">
        <CircleAlert />
        <p>Cannot Insert Same Task</p>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

/* Scrollbar for Firefox */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #555 #222;
}

/* Scrollbar for Webkit */
.scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 10px;
}

.scrollbar-thumb-gray-600::-webkit-scrollbar-thumb:hover {
  background: #777;
}

.scrollbar-track-[#2d2d2d]::-webkit-scrollbar-track {
  background: #2d2d2d;
  border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 8px;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}

.toast-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.toast-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
