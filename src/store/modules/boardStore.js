/* eslint-disable prettier/prettier */
import { getAllPosts, getPost } from "@/components/api/board";
import { GET_POST, SET_BOARD_LIST } from "../mutation-types";

const boardStore = {
  namespaced: true,
  state: {
    post: {},
    posts: [],
  },
  getters: {},
  mutations: {
    [SET_BOARD_LIST]: (state, posts) => {
      state.posts = posts;
    },
    [GET_POST]: (state, post) => {
      state.post = post;
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
    async setBoardDetail({ commit }, code) {
      await getPost(
        code,
        ({ data, status }) => {
          if (status === 200) {
            commit(GET_POST, data);
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
