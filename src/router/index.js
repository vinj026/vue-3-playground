import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CounterButton from "@/components/reactivity/CounterButton/CounterButton.vue";
import CounterButtonAlt1 from "@/components/reactivity/CounterButton/CounterButtonAlt1.vue";
import TodoList from "@/components/reactivity/TodoList/TodoList.vue";
import FilterableProduct from "@/components/reactivity/FilterableProduct/FilterableProduct.vue";
import UserCard from "@/components/reactivity/UserCard/UserCard.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/counter",
    name: "CounterButton",
    component: CounterButton,
    meta: { hideOtherMenus: true, centeredLayout: true }, // Menambahkan meta untuk menyembunyikan menu lain
  },
  {
    path: "/counteralt1",
    name: "CounterButtonAlt1",
    component: CounterButtonAlt1,
    meta: { hideOtherMenus: true, centeredLayout: true }, // Menambahkan meta untuk menyembunyikan menu lain
  },
  {
    path: "/todolist",
    name: "TodoList",
    component: TodoList,
    meta: { hideOtherMenus: true, centeredLayout: true }, // Menambahkan meta untuk menyembunyikan menu lain
  },
  {
    path: "/filterableproduct",
    name: "FilterableProduct",
    component: FilterableProduct,
    meta: { hideOtherMenus: true, centeredLayout: true }, // Menambahkan meta untuk menyembunyikan menu lain
  },
  {
    path: "/UserCard",
    name: "UserCard",
    component: UserCard,
    meta: { hideOtherMenus: true, centeredLayout: true }, // Menambahkan meta untuk menyembunyikan menu lain
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
