import moduleAuth from "./modules/auth";
import moduleMessage from "./modules/message";

const store = {
  modules: {
    auth: moduleAuth,
    message: moduleMessage,
  },
};

export default store;
