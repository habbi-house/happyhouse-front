/* eslint-disable */
import {
  SET_USER,
  LOGOUT,
  SET_AXIOS_TOKEN,
  SET_WISH_LIST,
  SET_WISH_INFO,
} from "@/store/mutation-types.js";
import { parseJwt } from "@/util/Jwt";
import { getApiInstance } from "@/components/api/index.js";
import {
  signIn,
  signUp,
  signInKakao,
  withdrawUser,
  updateUser,
  getUserByNo,
  refreshUser,
  logoutUser,
  getWishlist,
  getWishInfo,
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
    wishlist: [],
    wishInfos: [],
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
    SET_USER(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.user = {
        no: null,
        id: null,
        password: null,
        name: null,
        email: null,
        phone: null,
      };
    },
    SET_AXIOS_TOKEN(state, token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    SET_WISH_LIST(state, data) {
      state.wishlist = data;
    },
    SET_WISH_INFO(state, data) {
      state.wishInfos = data;
    },
  },
  actions: {
    setUser: ({ commit }, token) => {
      commit(SET_USER, parseJwt(token).user);
    },
    loginKakao: async ({ commit }, code) => {
      return await signInKakao(
        code,
        ({ data }) => {
          commit(SET_AXIOS_TOKEN, data);
          let jwt = parseJwt(data);
          commit(SET_USER, {
            no: null,
            id: null,
            password: null,
            name: jwt.user.name,
            email: jwt.user.email,
            phone: null,
          });
          return { status: 200, msg: "카카오로 로그인 성공" };
        },
        (err) => {
          console.log(err);
          return { status: 500, msg: "카카오로 로그인 실패" };
        }
      );
    },
    login: async ({ commit }, user) => {
      return await signIn(
        user,
        ({ data, status }) => {
          if (status === 200) {
            commit(SET_AXIOS_TOKEN, data);
            getUserByNo(parseJwt(data).user.userNo, ({ data, status }) => {
              if (status === 200) {
                // console.log(data);
                commit(SET_USER, data);
              }
            });
            return { status, msg: "로그인 성공" };
          }
        },
        ({ response: { status, data } }) => {
          return { status, msg: data };
        }
      );
    },
    signUp: async ({ commit }, user) => {
      return await signUp(
        user,
        ({ data, status }) => {
          return { status, msg: data };
        },
        ({ response: { status, data } }) => {
          return { status, msg: data };
        }
      );
    },
    withdrawUser: async ({ commit }, no) => {
      return await withdrawUser(
        no,
        async ({ data, status }) => {
          if (status === 200) {
            await logoutUser(
              ({ data, status }) => {
                if (status === 200) {
                  commit(LOGOUT);
                }
              },
              ({ response }) => {
                console.log(response);
              }
            );
          }
          return { status, msg: "탈퇴 성공" };
        },
        ({ response: { status } }) => {
          return { status, msg: "에러 발생! 관리자에게 문의하세요." };
        }
      );
    },
    updateUser: async ({ commit }, user) => {
      return await updateUser(
        user,
        ({ data, status }) => {
          if (status === 200) {
            commit(SET_USER, data);
            return { status, msg: "회원 정보 수정 완료" };
          }
        },
        ({ status, data }) => {
          console.log(data);
          return { status, msg: data };
        }
      );
    },
    getUserByNo: async ({ commit }, no) => {
      await getUserByNo(
        no,
        ({ data, status }) => {
          if (status === 200) {
            commit(SET_USER, data);
          }
        },
        ({ response }) => {
          console.log(response);
        }
      );
    },
    refreshUser: async ({ commit, state }) => {
      await refreshUser(
        ({ data, status }) => {
          if (status === 200) {
            commit(SET_AXIOS_TOKEN, data);
            if (parseJwt(data).user.userNo) {
              getUserByNo(parseJwt(data).user.userNo, ({ data, status }) => {
                if (status === 200) {
                  console.log(data);
                  commit(SET_USER, data);
                  getWishlist(state.user.email, (response) => {
                    state.wishlist = response.data;
                  });
                }
              });
            } else {
              let jwt = parseJwt(data);
              commit(SET_USER, {
                no: null,
                id: null,
                password: null,
                name: jwt.user.name,
                email: jwt.user.email,
                phone: null,
              });
              getWishlist(state.user.email, (response) => {
                state.wishlist = response.data;
              });
            }
          }
        },
        ({ response }) => {
          console.log(response);
        }
      );
    },
    logout: async ({ commit }) => {
      return await logoutUser(
        ({ data, status }) => {
          if (status === 200) {
            commit(LOGOUT);
          }
          return { status, msg: "로그아웃 성공" };
        },
        ({ response: { status, data } }) => {
          console.log(response);
          return { status, msg: data };
        }
      );
    },
    updateWishlist: async ({ commit }, email) => {
      await getWishlist(
        email,
        ({ data }) => {
          commit(SET_WISH_LIST, data);
        },
        (response) => {
          console.log(response);
        }
      );
    },
    async getWishInfo({ commit }, wishlist) {
      await getWishInfo(
        wishlist,
        ({ data, status }) => {
          if (status === 200) {
            console.log(data);
            commit(SET_WISH_INFO, data);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};

export default userStore;
