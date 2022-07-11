import type { ActionContext } from "vuex";

interface State {
  message: string | null;
  type: string | null;
}

const moduleMessage = {
  state: () => ({
    message: null,
    type: false,
  }),
  mutations: {
    success(state: State, message: string) {
      state.type = "alert-success";
      state.message = message;
    },
    error(state: State, message: string) {
      state.type = "alert-danger";
      state.message = message;
    },
    clear(state: State) {
      state.type = null;
      state.message = null;
    },
  },
  actions: {
    success({ commit }: ActionContext<State, State>, message: string) {
      commit("success", message);
    },
    error({ commit }: ActionContext<State, State>, message: string) {
      commit("error", message);
    },
    clear({ commit }: ActionContext<State, State>) {
      commit("clear");
    },
  },
  getters: {
    getMessage(state: State) {
      return state.message;
    },
    getType(state: State) {
      return state.type;
    },
  },
};

export default moduleMessage;
