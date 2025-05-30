<script setup>
import { ref, reactive } from "vue";

const formData = ref({
  name: "",
  email: "",
  error: {
    name: "",
    email: "",
    hasError: null,
  },
});

const Contacts = ref([]);

const validateEmail = (email) => {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const resetError = () => {
  formData.value.error = {
    name: "",
    email: "",
    hasError: false,
  };
};

const validateForm = () => {
  resetError();
  const validateThisField = ["name", "email"];
  validateThisField.forEach((field) => {
    const data = formData.value[field].trim();

    if (data === "") {
      formData.value.error[field] = `${field} is required`;
      formData.value.error.hasError = true;
    }

    if (field === "email") {
      const isEmailValid = validateEmail(data);
      if (!isEmailValid) {
        formData.value.error[field] = "Invalid email format";
        formData.value.error.hasError = true;
      }
    }
  });
  if (!formData.value.error.hasError) {
    const addToContacts = validateThisField.reduce((acc, key) => {
      acc[key] = formData.value[key].trim();
      return acc;
    }, {});
    Contacts.value.push(addToContacts);
    formData.value.name = "";
    formData.value.email = "";
  }

  console.log(formData.value);
  console.log(Contacts.value);
};
</script>

<template>
  <div class="flex flex-col items-center gap-6 w-full max-w-5xl mx-auto p-4">
    <form
      @submit.prevent="validateForm"
      class="flex sm:flex-row items-start sm:items-center gap-4 w-full"
      novalidate
    >
      <!-- NAME -->
      <div class="flex w-full">
        <div class="relative w-full">
          <input
            v-model="formData.name"
            type="text"
            id="name"
            placeholder="Name"
            :class="[
              ' w-full rounded px-4 py-3 outline-none text-on-surface transition-all duration-300 border',
              formData.error.name
                ? 'border-error bg-error-container/10'
                : 'border-none hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary',
              'bg-surface-container',
            ]"
          />
          <transition name="fade">
            <p
              v-if="formData.error.name"
              class="absolute -bottom-5 left-0 text-error text-xs flex items-center gap-1"
            >
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ formData.error.name }}
            </p>
          </transition>
        </div>
      </div>

      <!-- EMAIL -->
      <div class="flex w-full">
        <label for="email" class="sr-only">Email</label>
        <div class="relative w-full">
          <input
            v-model="formData.email"
            type="email"
            id="email"
            placeholder="Email"
            :class="[
              'w-full rounded px-4 py-3 outline-none text-on-surface transition-all duration-300 border',
              formData.error.email
                ? 'border-error bg-error-container/10'
                : 'border-none hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary',
              'bg-surface-container',
            ]"
          />
          <transition name="fade">
            <p
              v-if="formData.error.email"
              class="absolute -bottom-5 left-0 text-error text-xs flex items-center gap-1"
            >
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ formData.error.email }}
            </p>
          </transition>
        </div>
      </div>

      <!-- SUBMIT -->
      <button
        type="submit"
        class="group bg-primary text-on-primary py-3 px-6 rounded-md hover:bg-primary/90 transition-all duration-300 active:scale-95"
      >
        <span class="relative z-10">Submit</span>
        <span
          class="ripple absolute rounded-full w-8 h-8 bg-white/30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        ></span>
      </button>
    </form>

    <!-- USER CARDS -->
    <div
      class="w-full max-h-72 overflow-y-auto grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 p-2"
    >
      <transition-group
        name="list"
        tag="div"
        class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 p-2"
      >
        <div
          v-for="(user, index) in Contacts"
          :key="index"
          class="bg-surface-container rounded-md p-4 shadow-sm text-on-surface transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
        >
          <p class="font-medium truncate">Name: {{ user.name }}</p>
          <p class="truncate text-on-surface-variant">
            Email: {{ user.email }}
          </p>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active {
  transition: all 0.3s ease-out;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.ripple {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0.7;
}

button:focus-visible .ripple {
  animation: ripple 0.8s ease-out forwards;
}

@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.7;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    transform: translate(-50%, -50%) scale(4);
    opacity: 0;
  }
}

/* Card animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
