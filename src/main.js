import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

createApp(App)
  .use(router) // Pastikan memanggil .use(router)
  .mount("#app");
