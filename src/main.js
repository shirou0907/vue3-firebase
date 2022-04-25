import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

//VueX
import { createStore } from "vuex";
import store from "@/store/index.js";
const vuex = createStore(store);
app.use(vuex);

//Vue Router
import router from "./router";
app.use(router);

app.mount("#app");
