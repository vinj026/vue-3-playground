<script setup>
import { reactive, watch } from "vue";
import { X } from "lucide-vue-next";

const todo = reactive([]);
const usrInput = reactive({
  input: "",
  isDisabled: true,
});

watch(usrInput, (newVal) => {
  newVal.input === ""
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
    }
  } else {
    todo.push({
      id: todo.length + 1,
      task: usrInput.input,
      isDone: false,
    });
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
  <div class="todoContainer">
    <div class="inputSection">
      <input type="text" name="userInput" v-model="usrInput.input" placeholder="Add a new task..." />
      <button :disabled="usrInput.isDisabled" @click="handleSubmit">
        Submit
      </button>
    </div>

    <div class="itemSection">
      <div v-for="item in todo" :key="item.id" class="itemRow">
        <span class="taskText">{{ item.task }}</span>
        <button @click="handleRemove(item.id)" class="removeBtn">
          <X width="16" height="16" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todoContainer {
  display: grid;
  grid-template-rows: minmax(auto, max-content);
  box-sizing: border-box;
  width: 450px;
  height: 75vh;
  min-height: 45vh;
  padding: 16px;
  color: #ffffff;
  /* Teks putih */
  font-family: "Segoe UI", sans-serif;
  border-radius: 12px;
}

.inputSection {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
}

.inputSection input {
  flex: 1;
  padding: 10px 12px;
  border-radius: 6px;
  border: none;
  outline: none;
  font-size: 1rem;
  background-color: #2d2d2d;
  /* Latar belakang input */
  color: #ffffff;
  /* Teks putih */
  transition: all 0.3s ease;
}

.inputSection input:focus {
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.3);
  /* Efek focus hijau muda */
}

.inputSection button {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  background-color: #42b981;
  /* Tombol hijau muda */
  color: #ffffff;
  /* Teks putih */
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.3);
  /* Shadow hijau muda */
}

.inputSection button:disabled {
  background-color: #0d0d0d;
  /* Hitam sangat tua */
  cursor: not-allowed;
  box-shadow: none;
}

.inputSection button:hover:not(:disabled) {
  background-color: #36986d;
  /* Hijau muda lebih tua */
  transform: translateY(-2px);
}

.inputSection button:active:not(:disabled) {
  transform: translateY(0);
}

.itemSection {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: calc(75vh - 120px);
  scrollbar-width: thin;
  scrollbar-color: #555 #222;
  border-radius: 8px;
}

/* Custom scroll bar for Chrome / Edge / Safari */
.itemSection::-webkit-scrollbar {
  width: 8px;
}

.itemSection::-webkit-scrollbar-track {
  background: #2d2d2d;
  /* Abu-abu gelap */
  border-radius: 10px;
}

.itemSection::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 10px;
}

.itemSection::-webkit-scrollbar-thumb:hover {
  background: #777;
}

/* Style per item */
.itemRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2d2d2d;
  /* Abu-abu gelap */
  padding: 12px 16px;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
  animation: fadeIn 0.3s ease-in-out;
}

.taskText {
  max-width: calc(100% - 40px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #ffffff;
  /* Teks putih */
  font-size: 0.95rem;
}

.removeBtn {
  background: transparent;
  all: unset;
  display: flex;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.removeBtn:hover {
  transform: scale(1.2);
}

/* Animasi tambahan */
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
</style>
