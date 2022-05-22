/* eslint-disable */
import vueCookies from "vue-cookies";
import {
  SET_ACCESS_TOKEN,
  SET_TOKEN_COOKIES,
  SET_USER,
  LOGOUT,
  SET_AXIOS_TOKEN,
  SET_JWT_TOKEN,
} from "@/store/mutation-types.js";
import { parseJwt } from "@/util/Jwt";
import { getApiInstance } from "@/components/api/index.js";
import {
  signIn,
  signUp,
  withdrawUser,
  updateUser,
} from "@/components/api/user.js";

const axios = getApiInstance();

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
    no(state) {
      return state.user.no;
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
      state.user = {
        no: null,
        id: null,
        password: null,
        name: null,
        email: null,
        phone: null,
      };
      vueCookies.remove("accessToken");
      vueCookies.remove("refreshToken");
      vueCookies.remove("token");
    },
    SET_AXIOS_TOKEN(state, token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    SET_JWT_TOKEN(state, token) {
      vueCookies.set("token", token);
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
    loginKakao: ({ commit }, code) => {
      axios
        .get("http://localhost:8888/user/kakao?code=" + code)
        .then(({ data }) => {
          console.log(data);
          commit(SET_ACCESS_TOKEN, data.tokens);
          commit(SET_TOKEN_COOKIES, data.tokens);
          commit(SET_USER, parseJwt(data.token).user);
          commit(SET_AXIOS_TOKEN, data.token);
          commit(SET_JWT_TOKEN, data.token);
        })
        .catch((err) => {
          console.log(err);
          alert("로그인에 실패했습니다.");
        });
      console.log(axios.defaults.headers);
    },
    login: async ({ commit }, user) => {
      await signIn(
        user,
        ({ data, status }) => {
          if (status === 200) {
            commit(SET_USER, parseJwt(data).user);
            commit(SET_AXIOS_TOKEN, data);
            commit(SET_JWT_TOKEN, data);
            alert("로그인 성공");
          }
        },
        ({ response }) => {
          alert(response.data);
        }
      );
    },
    signUp: async ({ commit }, user) => {
      await signUp(
        user,
        ({ data, status }) => {
          if (status === 200) {
            alert(data);
          }
        },
        ({ response }) => {
          alert(response.data);
        }
      );
    },
    withdrawUser: async ({ commit }, no) => {
      await withdrawUser(
        no,
        ({ data, status }) => {
          if (status === 200) {
            alert(data);
            commit(LOGOUT);
          }
        },
        ({ response }) => {
          alert("에러발생 관리자에게 문의하세요.");
        }
      );
    },
    updateUser: async ({ commit }, user) => {
      await updateUser(
        user,
        ({ data, status }) => {
          if (status === 200) {
            commit(SET_USER, user);
            alert("회원 정보 수정 완료");
          }
        },
        ({ response }) => {
          console.log(response);
          alert(response);
        }
      );
    },
  },
};

export default userStore;
