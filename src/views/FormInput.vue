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
  }

  console.log(formData.value);
  console.log(Contacts.value);
};
</script>

<template>
  <div
    class="flex items-center justify-center bg-surface transition-colors duration-300"
  >
    <form
      @submit.prevent="validateForm"
      class="bg-surface-container rounded-xl p-6 w-full max-w-md space-y-4 text-on-surface transition-all duration-300 ease-in-out transform shadow-md"
    >
      <div class="space-y-2 group">
        <label
          for="name"
          class="block font-medium transition-colors duration-200 group-focus-within:text-primary"
        >
          What is your name?
        </label>
        <div class="relative">
          <input
            type="text"
            v-model="formData.name"
            id="name"
            :class="[
              'w-full bg-inverse-on-surface rounded px-3 py-2 outline-none transition-all duration-200',
              {
                'border-2 border-error focus:border-error': formData.error.name,
                'border-primary focus:ring-2 focus:ring-primary':
                  !formData.error.name,
              },
            ]"
          />
          <transition name="fade">
            <div v-show="formData.error.name" class="absolute -bottom-5 left-0">
              <p class="text-error text-sm flex items-center gap-1 mt-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ formData.error.name }}
              </p>
            </div>
          </transition>
        </div>
      </div>

      <div class="space-y-2 group">
        <label
          for="email"
          class="block font-medium transition-colors duration-200 group-focus-within:text-primary"
        >
          Your Email?
        </label>
        <div class="relative">
          <input
            type="email"
            v-model="formData.email"
            id="email"
            :class="[
              'w-full bg-inverse-on-surface rounded px-3 py-2 outline-none transition-all duration-200',
              {
                'border-2 border-error focus:border-error':
                  formData.error.email,
                'border-primary focus:ring-2 focus:ring-primary':
                  !formData.error.email,
              },
            ]"
          />
          <transition name="fade">
            <div
              v-show="formData.error.email"
              class="absolute -bottom-5 left-0"
            >
              <p class="text-error text-sm flex items-center gap-1 mt-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ formData.error.email }}
              </p>
            </div>
          </transition>
        </div>
      </div>

      <button
        type="submit"
        class="w-full bg-primary text-on-primary py-2 rounded mt-2 hover:bg-primary/85 transition-all duration-200 active:scale-95 relative overflow-hidden"
      >
        <span class="relative z-10">Submit</span>
        <span
          class="ripple absolute rounded-full w-8 h-8 bg-white/20 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        ></span>
      </button>
    </form>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Ripple Effect */
.ripple {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.6s ease-out;
}

button:focus-visible .ripple {
  animation: ripple 0.6s ease-out;
}
</style>
