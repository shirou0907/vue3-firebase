const moduleMessage = {
  state: () => ({
    message: null,
    type: false,
  }),
  mutations: {
    success(state, message) {
      state.type = "alert-success";
      state.message = message;
    },
    error(state, message) {
      state.type = "alert-danger";
      state.message = message;
    },
    clear(state) {
      state.type = null;
      state.message = null;
    },
  },
  actions: {
    success({ commit }, message) {
      commit("success", message);
    },
    error({ commit }, message) {
      commit("error", message);
    },
    clear({ commit }) {
      commit("clear");
    },
  },
  getters: {
    getMessage(state) {
      return state.message;
    },
    getType(state) {
      return state.type;
    },
  },
};

export default moduleMessage;
