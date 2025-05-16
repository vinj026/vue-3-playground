<template>
  <div id="app" :class="layoutClass">
    <!-- Navigasi Sidebar -->
    <router-view />
    <nav class="sidebar">
      <ul class="menu">
        <!-- Home -->
        <li class="menu-item">
          <router-link to="/" class="menu-link">Home</router-link>
        </li>

        <!-- Group: Reactive -->
        <li class="menu-group">
          <template v-if="!hideOtherMenus">
            <span class="menu-group-title">Reactivity Basic</span>
            <ul class="submenu">
              <!-- Submenu Items -->
              <li class="submenu-item">
                <router-link to="/counter" class="submenu-link"
                  >Counter Button</router-link
                >
              </li>
              <li class="submenu-item">
                <router-link to="/counteralt1" class="submenu-link"
                  >Counter Button Alternative 1</router-link
                >
              </li>
            </ul>
            <span class="menu-group-title">Components & Communication</span>
            <ul class="submenu">
              <li class="submenu-item">
                <router-link to="/todolist" class="submenu-link"
                  >Todo List</router-link
                >
              </li>

              <li class="submenu-item">
                <router-link to="/usercard" class="submenu-link"
                  >User Card
                </router-link>
              </li>
            </ul>
            <span class="menu-group-title"
              >State Management & Reactivity Advanced</span
            >
            <ul class="submenu">
              <!-- Submenu Items -->
              <li class="submenu-item">
                <router-link to="/filterableproduct" class="submenu-link"
                  >Filterable Product List
                </router-link>
              </li>
            </ul>
          </template>
        </li>

        <!-- Todo List -->
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

// Ambil rute saat ini
const route = useRoute();

// Cek apakah rute saat ini menyembunyikan menu selain Home
const hideOtherMenus = computed(() => route.meta.hideOtherMenus);

const layoutClass = computed(() => {
  return route.meta.centeredLayout ? "centered-layout" : "";
});
</script>

<style scoped>
.sidebar {
  width: 100%;
  display: flex;
  text-align: start;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #fbf5f3;
}

.menu-item {
  margin-bottom: 16px;
  color: #fbf5f3;
}

.menu-link {
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  color: #a2a2a2;
}

.menu-link:hover {
  transition: color 0.3s ease;
  color: #42b9a1;
}

.menu-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.menu-group span {
  font-size: 1rem;
  font-weight: 600;
  color: #a2a2a2;
}

.submenu {
  list-style: none;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.submenu-link {
  font-size: 1rem;
  text-decoration: none;
  font-weight: 400;
  color: #a2a2a2;
  transition: color 0.6s ease;
}

.submenu-item-nested {
  list-style: none;
  padding-left: 20px;
}

.submenu-link:hover {
  color: #42b9a1;
  transition: color 0.9s ease;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  gap: 48px;
}

#app.centered-layout {
  align-items: center;
}
</style>
