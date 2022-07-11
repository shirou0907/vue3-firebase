import moduleAuth from "./modules/auth";
import moduleMessage from "./modules/message";
import { createStore } from "vuex";

export default createStore({
  modules: {
    auth: moduleAuth,
    message: moduleMessage,
  },
  strict: true,
});
