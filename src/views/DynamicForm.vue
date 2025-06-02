<script setup>
import { reactive, ref } from "vue";
import { Plus, Phone, Minus } from "lucide-vue-next";

const formData = reactive({ name: "", email: "", phone: [""] });
const errors = reactive({
  name: null,
  email: null,
  phone: [],
  isDuplicate: false,
});
const Contacts = reactive([]);
const isSubmitted = ref(false);

const theValidators = {
  isEmptyField(formDataKeys_) {
    let valid = true;
    formDataKeys_.forEach((key) => {
      if (typeof formData[key] === "string") {
        if (formData[key] === "") {
          errors[key] = `${key} is required`;
          valid = false;
        }
      }

      if (Array.isArray(formData[key])) {
        errors[key] = [];
        formData[key].forEach((item, idx) => {
          if (item.trim() === "") {
            errors[key][idx] = `${key} is required`;
            valid = false;
          }
        });
      }
    });
    return valid;
  },
  isEmailValid(email) {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  },
  isPhoneValid(phone) {
    let regex = /^\d{8}$/;
    return regex.test(phone);
  },
};

const checkDuplicate = () => {
  for (let i = 0; i < Contacts.length; i++) {
    const contact = Contacts[i];
    let isMatch = true;
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        if (!Array.isArray(contact[key])) {
          isMatch = false;
          break;
        }
        if (formData[key].length !== contact[key].length) {
          isMatch = false;
          break;
        }
        for (let j = 0; j < formData[key].length; j++) {
          if (formData[key][j] !== contact[key][j]) {
            isMatch = false;
            break;
          }
        }
        if (!isMatch) break;
      } else if (formData[key] !== contact[key]) {
        isMatch = false;
        break;
      }
    }
    if (isMatch) {
      errors.isDuplicate = true;
      return true;
    }
  }
  errors.isDuplicate = false;
  return false;
};

const addPhone = () => {
  formData.phone.length < 3 ? formData.phone.push("") : "";
};

const removePhone = (i) => {
  formData.phone.splice(i, 1);
};

const resetError = () => {
  const errorsKey = Object.keys(errors);
  errorsKey.forEach((key) => {
    if (typeof errors[key] === "string") {
      errors[key] = null;
    }
    if (Array.isArray(errors[key])) {
      errors[key] = [];
    }
  });
};

const resetForm = () => {
  for (const key in formData) {
    if (typeof formData[key] === "string") {
      formData[key] = "";
    }
    if (Array.isArray(formData[key])) {
      formData[key] = [""];
    }
  }
};

const pushData = () => {
  Contacts.push(JSON.parse(JSON.stringify(formData)));
};

const validateForm = () => {
  resetError();
  const formDataKeys = Object.keys(formData);

  if (!theValidators.isEmptyField(formDataKeys)) return false;
  if (!theValidators.isEmailValid(formData.email)) {
    errors.email = "Invalid email format";
    return false;
  }

  for (const p of formData.phone) {
    if (p !== "" && !theValidators.isPhoneValid(p)) {
      errors.phone.push("Invalid phone number (must be 8 digits)");
      return false;
    }
  }

  return true;
};

const handleSubmit = () => {
  if (!checkDuplicate()) {
    if (validateForm()) {
      pushData();
      resetForm();
      isSubmitted.value = true;
      setTimeout(() => {
        isSubmitted.value = false;
      }, 600);
    }
  }
};
</script>

<template>
  <div class="text-on-surface p-6 md:p-10 font-sans">
    <div class="grid md:grid-cols-[1.5fr_2.5fr] gap-10 max-w-7xl mx-auto">
      <!-- Form -->
      <div class="rounded-xl shadow-lg p-6">
        <h1 class="text-xl font-bold mb-6 text-on-surface">Input Form</h1>
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
          <!-- Name -->
          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium text-on-surface-variant"
              >Name</span
            >
            <input
              type="text"
              v-model="formData.name"
              :class="[
                'bg-surface-container-high p-4 rounded-xl shadow-inner outline-none',
                'transition-all duration-200 ease-in-out',
                'focus:ring-2 focus:ring-primary focus:bg-surface-container-highest',
                'hover:ring-2 hover:ring-primary',
                errors.name ? 'ring-2 ring-error' : '',
              ]"
            />
            <transition name="fade-slide">
              <p v-if="errors.name" class="text-error text-sm mt-1">
                {{ errors.name }}
              </p>
            </transition>
          </label>

          <!-- Email -->
          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium text-on-surface-variant"
              >Email</span
            >
            <input
              type="text"
              v-model="formData.email"
              :class="[
                'bg-surface-container-high p-4 rounded-xl shadow-inner outline-none',
                'transition-all duration-200 ease-in-out',
                'focus:ring-2 focus:ring-primary focus:bg-surface-container-highest',
                'hover:ring-2 hover:ring-primary',
                errors.email ? 'ring-2 ring-error' : '',
              ]"
            />
            <transition name="fade-slide">
              <p v-if="errors.email" class="text-error text-sm mt-1">
                {{ errors.email }}
              </p>
            </transition>
          </label>

          <!-- Phones -->
          <TransitionGroup name="list" tag="div" class="flex flex-col gap-4">
            <div
              v-for="(p, i) in formData.phone"
              :key="i"
              class="flex flex-col gap-1"
            >
              <label class="text-sm font-medium text-on-surface-variant"
                >Phone</label
              >
              <div class="flex gap-2 items-center">
                <input
                  type="text"
                  v-model="formData.phone[i]"
                  :class="[
                    'bg-surface-container-high p-4 rounded-xl shadow-inner outline-none flex-1',
                    'transition-all duration-200 ease-in-out',
                    'focus:ring-2 focus:ring-primary focus:bg-surface-container-highest',
                    'hover:ring-2 hover:ring-primary',
                    errors.phone[i] ? 'ring-2 ring-error' : '',
                  ]"
                />
                <button
                  type="button"
                  v-if="i > 0"
                  @click="removePhone(i)"
                  class="text-on-surface hover:text-error transition-transform duration-200 hover:scale-110"
                >
                  <Minus />
                </button>
              </div>
              <transition name="fade-slide">
                <p v-if="errors.phone[i]" class="text-error text-sm mt-1">
                  {{ errors.phone[i] }}
                </p>
              </transition>
            </div>
          </TransitionGroup>

          <!-- Buttons -->
          <div class="flex gap-3 mt-2">
            <transition name="scale-pulse">
              <button
                type="submit"
                :class="[
                  'flex-1 py-3 px-4 rounded-xl bg-primary text-on-primary font-semibold flex items-center justify-center gap-2',
                  'hover:bg-primary/80 hover:text-on-primry active:scale-95 transition-all',
                  isSubmitted ? 'ring-2 ring-primary' : '',
                ]"
              >
                Submit
              </button>
            </transition>
            <button
              type="button"
              @click="addPhone"
              class="py-3 px-4 rounded-xl bg-primary text-on-primary flex items-center justify-center gap-2 hover:bg-primary/80 hover:text-on-primary active:scale-95 transition-all"
            >
              <Plus class="w-4 h-4" /> <Phone class="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      <!-- Contact List -->
      <div class="space-y-4 p-6">
        <h1 class="text-xl font-bold text-on-surface">User Contacts</h1>
        <div class="space-y-3">
          <TransitionGroup name="card" tag="div">
            <div
              v-for="(contact, i) in Contacts"
              :key="i"
              class="bg-surface-container rounded-xl shadow-md p-5 hover:shadow-xl transition-all duration-300"
            >
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p class="text-xs text-on-surface-variant">Name</p>
                  <p class="text-sm font-medium">{{ contact.name }}</p>
                </div>
                <div>
                  <p class="text-xs text-on-surface-variant">Email</p>
                  <p class="text-sm font-medium">{{ contact.email }}</p>
                </div>
                <div>
                  <p class="text-xs text-on-surface-variant">Phone</p>
                  <p class="text-sm font-medium">
                    {{
                      Array.isArray(contact.phone)
                        ? contact.phone.join(", ")
                        : contact.phone
                    }}
                  </p>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>

    <!-- Duplicate Warning -->
    <transition name="slide-down" appear>
      <div
        v-show="errors.isDuplicate"
        class="fixed bottom-6 right-6 bg-error text-on-error px-5 py-3 rounded-full shadow-lg z-50 backdrop-blur-sm flex items-center gap-2 animate-pulse"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 011 1v4a1 1 0 11-2 0V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Duplicate contact detected</span>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Fade Slide */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* List Animation */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Card Animation */
.card-enter-active {
  transition: all 0.4s ease;
}
.card-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* Slide Down Notification */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

/* Pulse Button */
.scale-pulse-enter-active {
  animation: pulse 0.5s ease;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
