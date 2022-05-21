import vueCookies from "vue-cookies";
import {
  SET_ACCESS_TOKEN,
  SET_TOKEN_COOKIES,
  SET_EMAIL,
  SET_USER,
  LOGOUT,
} from "@/store/mutation-types.js";

const userStore = {
  namespaced: true,
  state: {
    user: {
      id: "frog",
      password: "q1w2e3r4",
      name: "깨꾹이",
      email: "frog@frog.com",
    },
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
    },
    SET_TOKEN_COOKIES(state, tokens) {
      vueCookies.set("accessToken", tokens.accessToken);
      vueCookies.set("refreshToken", tokens.refreshToken);
    },
    SET_EMAIL(state, email) {
      state.user.email = email;
    },
    SET_USER(state, user) {
      console.log(user);
      state.user = user;
    },
    LOGOUT(state) {
      state.token = null;
      vueCookies.remove("accessToken");
      vueCookies.remove("refreshToken");
      vueCookies.remove("email");
      vueCookies.remove("token");
    },
  },
  actions: {
    setToken: ({ commit }, tokens) => {
      commit(SET_ACCESS_TOKEN, tokens.accessToken);
    },
    setTokenCookie: ({ commit }, tokens) => {
      commit(SET_TOKEN_COOKIES, tokens);
    },
    setEmail: ({ commit }, email) => {
      commit(SET_EMAIL, email);
      vueCookies.set("email", email);
    },
    logoutUser: ({ commit }) => {
      commit(LOGOUT);
    },
    setUser: ({ commit }, user) => {
      commit(SET_USER, user);
    },
  },
};

export default userStore;
