<template>
  <div id="app">
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
          <span class="menu-group-title">Reactive</span>
          <ul class="submenu">
            <!-- Submenu Items -->
            <li class="submenu-item">
              <router-link to="/reactive/counter" class="submenu-link">Counter Button</router-link>
            </li>
            <li class="submenu-item">
              <router-link to="/reactive/counteralt1" class="submenu-link">Counter Button Alternative 1</router-link>
            </li>
            <li class="submenu-item">
              <router-link to="/todo" class="menu-link">Todo List</router-link>
            </li>
          </ul>
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
</script>

<style scoped>
.sidebar {
  width: 100%;
  padding: 10px;
  display: flex;
  text-align: start;
}

.menu {
  list-style: none;
  padding: 0;
  color: #fbf5f3;
}

.menu-item {
  margin-bottom: 10px;
  color: #fbf5f3;
}

.menu-link {
  text-decoration: none;
  font-size: 1.1rem;
  color: #fbf5f3;
}

.menu-group {
  margin-bottom: 20px;
}

.menu-group-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 16px;
}

.submenu {
  list-style: none;
  padding-left: 20px;
  color: #fbf5f3;
}

.submenu-item {
  margin-bottom: 8px;
  font-size: 1rem;
}

.submenu-link {
  text-decoration: none;
  color:#fbf5f3;
}

.submenu-item-nested {
  list-style: none;
  padding-left: 20px;
}

.submenu-link:hover {
  color: #ff6347;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: start;
}
</style>
