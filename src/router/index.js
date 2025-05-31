import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CounterButton from "../views/CounterButton.vue";
import CounterButtonAlt1 from "../views/CounterButtonAlt1.vue";
import TodoList from "../views/TodoList.vue";
import UserCard from "../views/UserCard.vue";
import FilterableProduct from "../views/FilterableProduct.vue";
import TenderList from "../views/TenderList.vue";
import FormInput from "../views/FormInput.vue";
import DynamicForm from "../views/DynamicForm.vue";
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
  {
    path: "/todolist",
    name: "TodoList",
    component: TodoList,
    meta: { hideOtherMenus: true, centeredLayout: true },
  },
  {
    path: "/usercard",
    name: "UserCard",
    component: UserCard,
    meta: { hideOtherMenus: true, centeredLayout: true },
  },
  {
    path: "/filterableproduct",
    name: "FilterableProduct",
    component: FilterableProduct,
    meta: { hideOtherMenus: true, centeredLayout: true },
  },
  {
    path: "/tenderlist",
    name: "Tender List",
    component: TenderList,
    meta: { hideOtherMenus: true, centeredLayout: true },
  },
  {
    path: "/basicforminput",
    name: "Basic Form Input",
    component: FormInput,
    meta: { hideOtherMenus: true, centeredLayout: true },
  },
  {
    path: "/dynamicforminput",
    name: "Dynamic Form Input",
    component: DynamicForm,
    meta: { hideOtherMenus: true, centeredLayout: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
