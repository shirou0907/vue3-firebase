import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// import { clickOutside } from "@/until/directives";
// app.directive("click-outside", clickOutside);

//Lazy loading images
const loadimage = new URL("/img/loading-image.gif", import.meta.url).href;
const errorimage = new URL("/img/loading-image.gif", import.meta.url).href;
import VueLazyload from "vue-lazyload";
app.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1,
  // set observer to true
  observer: true,

  // optional
  observerOptions: {
    rootMargin: "0px",
    threshold: 0.1,
  },
});

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
// import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, fab);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
app.component("font-awesome-icon", FontAwesomeIcon);

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css";
app.use(VueAwesomeSwiper /* { default options with global component } */);

//Vue
import store from "@/store/index.js";
store.dispatch("checkUser");

//Vue Router
import router from "./router";

import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
app.use(BootstrapVue3);

app.use(store).use(router).mount("#app");
