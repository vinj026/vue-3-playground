<script setup>
import { reactive, watch, computed } from "vue";

const formData = reactive({ name: "", email: "", phone: [""] });
const errors = reactive({ name: null, email: null, phone: [] });
const Contacts = reactive([]);

// const trimInputData = () => {
//   const trimmed = {};
//
//   Object.entries(formData).forEach(([key, value]) => {
//     trimmed[key] =
//       typeof value === "string"
//         ? value.trim()
//         : Array.isArray(value)
//           ? value.map((item) => (typeof item === "string" ? item.trim() : item))
//           : value;
//   });
//
//   return trimmed;
// };

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
        const allEmpty = formData[key].every((item) => item.trim() === "");
        if (allEmpty) {
          errors[key] = [];
          if (!Array.isArray(errors[key])) errors[key] = []; // fix penting
          errors[key].push(`${key} is required`);
          valid = false;
        }
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

const validateForm = () => {
  resetError();
  const formDataKeys = Object.keys(formData);

  if (!theValidators.isEmptyField(formDataKeys)) {
    return false;
  } else {
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
  }

  Contacts.push(formData);

  return true;
};

watch(
  () => ({ val1: formData, val2: Contacts }),
  (newVal) => {
    console.log("FormData:", newVal.val1);
    console.log("Contacts", newVal.val2);
  },
  { deep: true },
);
</script>

<template>
  <div class="grid grid-cols-[1fr_2fr] gap-2 text-on-surface">
    <form @submit.prevent="validateForm" action="" class="flex flex-col gap-4">
      <!-- Name -->
      <label for="name" class="flex flex-col gap-1">
        Name
        <input
          type="text"
          v-model="formData.name"
          :class="[
            'outline-none bg-surface-container-high p-2 rounded-lg',
            'focus:ring-2 focus:ring-primary focus:shadow-md',
            'hover:ring-2 hover:ring-primary hover:shadow-sm',
            'transition-all duration-200 ease-in-out',
            errors.name ? 'ring-2 ring-error' : '',
          ]"
        />
        <div
          class="relative h-5 overflow-hidden transition-all duration-300 ease-in-out"
          :class="{
            'max-h-10': errors.name,
            'max-h-0': !errors.name,
          }"
        >
          <p
            v-if="errors.name"
            class="text-error text-sm mt-1 opacity-0 animate-fadeInUp"
          >
            {{ errors.name }}
          </p>
        </div>
      </label>

      <!-- Email -->
      <label for="email" class="flex flex-col gap-1">
        Email
        <input
          type="text"
          v-model="formData.email"
          :class="[
            'outline-none bg-surface-container-high p-2 rounded-lg',
            'focus:ring-2 focus:ring-primary focus:shadow-md',
            'hover:ring-2 hover:ring-primary hover:shadow-sm',
            'transition-all duration-200 ease-in-out',
            errors.email ? 'ring-2 ring-error' : '',
          ]"
        />
        <div
          class="relative h-5 overflow-hidden transition-all duration-300 ease-in-out"
          :class="{
            'max-h-10': errors.email,
            'max-h-0': !errors.email,
          }"
        >
          <p
            v-if="errors.email"
            class="text-error text-sm mt-1 opacity-0 animate-fadeInUp"
          >
            {{ errors.email }}
          </p>
        </div>
      </label>

      <!-- Phones -->
      <div
        v-for="(p, i) in formData.phone"
        :key="i"
        class="flex flex-col gap-1"
      >
        <label>Phone</label>
        <input
          type="text"
          v-model="formData.phone[i]"
          :class="[
            'outline-none bg-surface-container-high p-2 rounded-lg',
            'focus:ring-2 focus:ring-primary focus:shadow-md',
            'hover:ring-2 hover:ring-primary hover:shadow-sm',
            'transition-all duration-200 ease-in-out',
            errors.phone[i] ? 'ring-2 ring-error' : '',
          ]"
        />
        <div
          class="relative h-5 overflow-hidden transition-all duration-300 ease-in-out"
          :class="{
            'max-h-10': errors.phone[i],
            'max-h-0': !errors.phone[i],
          }"
        >
          <p
            v-if="errors.phone[i]"
            class="text-error text-sm mt-1 opacity-0 animate-fadeInUp"
          >
            {{ errors.phone[i] }}
          </p>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="flex justify-center items-center bg-primary p-2 mt-5 h-10 rounded-md text-on-primary font-medium hover:bg-primary-container hover:text-on-primary-container active:scale-95 transition-transform duration-150"
      >
        Submit
      </button>
    </form>

    <div>
      <table></table>
    </div>
  </div>
</template>

<style>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeInUp {
  animation: fadeInUp 0.3s ease-in-out forwards;
}
</style>
