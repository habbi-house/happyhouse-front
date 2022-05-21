import vueCookies from "vue-cookies";
import { SET_ACCESS_TOKEN, SET_REFRESH_TOKEN } from "@/store/mutation-types.js";

const userStore = {
  namespaced: true,
  state: {
    token: null,
  },
  getters: {
    isLogin(state) {
      return state.token == null ? false : true;
    },
  },
  mutations: {
    SET_ACCESS_TOKEN(state, accessToken) {
      state.token = accessToken;
      vueCookies.set("accessToken", accessToken);
    },
    SET_REFRESH_TOKEN(state, refreshToken) {
      vueCookies.set("refreshToken", refreshToken);
    },
  },
  actions: {
    setToken: ({ commit }, tokens) => {
      commit(SET_ACCESS_TOKEN, tokens.accessToken);
      commit(SET_REFRESH_TOKEN, tokens.refreshToken);
    },
    setEmail: ({ rootState }, email) => {
      rootState.user.email = email;
      vueCookies.set("email", email);
    },
  },
};

export default userStore;
