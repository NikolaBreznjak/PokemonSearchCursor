import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import "./index.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Handle SPA redirect from 404.html (GitHub Pages)
const redirect = sessionStorage.getItem("redirect");
if (redirect) {
  sessionStorage.removeItem("redirect");
  router.replace(redirect);
}

app.mount("#app");
