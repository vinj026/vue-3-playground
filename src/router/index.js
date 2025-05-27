import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CounterButton from "../views/CounterButton.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { hideOtherMenus: false, centeredLayout: true },
  },
  {
    path: "/counter",
    name: "CounterButton",
    component: CounterButton,
    meta: { hideOtherMenus: true, centeredLayout: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
