import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CounterButton from "../views/CounterButton.vue";
import CounterButtonAlt1 from "../views/CounterButtonAlt1.vue";

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
  {
    path: "/counteralt1",
    name: "CounterButtonAlt1",
    component: CounterButtonAlt1,
    meta: { hideOtherMenus: true, centeredLayout: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
