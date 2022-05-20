/* eslint-disable prettier/prettier */
import { getAllPosts } from "@/components/api/board";
import { SET_BOARD_LIST } from "../mutation-types";

const boardStore = {
  namespaced: true,
  state: {
    posts: [],
  },
  getters: {},
  mutations: {
    [SET_BOARD_LIST]: (state, posts) => {
      state.posts = posts;
    },
  },
  actions: {
    async setBoardList({ commit }) {
      await getAllPosts(
        ({ data, status }) => {
          if (status === 200) {
            commit(SET_BOARD_LIST, data);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};

export default boardStore;
