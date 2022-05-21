import vueCookies from "vue-cookies";
import {
  SET_ACCESS_TOKEN,
  SET_TOKEN_COOKIES,
  SET_USER,
  LOGOUT,
} from "@/store/mutation-types.js";
import { parseJwt } from "@/util/Jwt";

const userStore = {
  namespaced: true,
  state: {
    user: {
      no: null,
      id: null,
      password: null,
      name: null,
      email: null,
      phone: null,
    },
    token: null,
  },
  getters: {
    isLogin(state) {
      return state.user.email == null ? false : true;
    },
    isKakao(state) {
      return state.user.email && state.user.no == null ? true : false;
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
    SET_USER(state, user) {
      console.log(user);
      state.user = user;
    },
    LOGOUT(state) {
      state.token = null;
      vueCookies.remove("accessToken");
      vueCookies.remove("refreshToken");
      vueCookies.remove("kakaoUser");
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
    logoutUser: ({ commit }) => {
      commit(LOGOUT);
    },
    setUser: ({ commit }, token) => {
      commit(SET_USER, parseJwt(token).user);
    },
  },
};

export default userStore;
