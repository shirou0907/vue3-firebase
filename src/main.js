import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far, fab);

// import { clickOutside } from "@/until/directives";
// app.directive("click-outside", clickOutside);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
app.component("font-awesome-icon", FontAwesomeIcon);

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
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
app.use(BootstrapVue3);

app.mount("#app");
