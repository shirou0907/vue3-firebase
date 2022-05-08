import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css";
app.use(VueAwesomeSwiper /* { default options with global component } */);

//VueX
import { createStore } from "vuex";
import store from "@/store/index.js";
const vuex = createStore(store);
app.use(vuex);

vuex.dispatch("checkUser");

//Vue Router
import router from "./router";
app.use(router);

import BootstrapVue3 from "bootstrap-vue-3";
// Optional, since every component import their Bootstrap functionality
// the following line is not necessary
// import 'bootstrap'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
app.use(BootstrapVue3);

app.mount("#app");
