import moduleAuth from "./modules/auth";
import moduleMessage from "./modules/message";
import { createStore } from "vuex";
const store = createStore({
  modules: {
    auth: moduleAuth,
    message: moduleMessage,
  },
});

export default store;
