/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "@/components/api/board";
import { GET_POST, SET_BOARD_LIST, INIT_POST } from "../mutation-types";

const boardStore = {
  namespaced: true,
  state: {
    post: {},
    posts: [],
    search: "",
  },
  getters: {
    posts(state) {
      let temp = state.posts.filter((post) => {
        return post.title.indexOf(state.search) != -1;
      });
      return temp;
    },
    getSearch(state) {
      return state.search;
    },
  },
  mutations: {
    [SET_BOARD_LIST]: (state, posts) => {
      state.posts = posts;
    },
    [GET_POST]: (state, post) => {
      state.post = post;
    },
    [INIT_POST]: (state) => {
      state.post = {
        code: 0,
        content: "",
        email: "",
        groupLayer: 0,
        groupOrd: 0,
        hits: 0,
        originNo: 0,
        reg_datetime: "",
        title: "",
        writer: "",
      };
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
    async createPost(_, post) {
      return await createPost(
        post,
        ({ data, status }) => {
          return { status, msg: "글 작성 성공" };
        },
        (err) => {
          console.log(err);
        }
      );
    },
    async updatePost(_, post) {
      return await updatePost(
        post,
        ({ data, status }) => {
          return { status, msg: "글 수정 성공" };
        },
        (err) => {
          console.log(err);
        }
      );
    },
    async deletePost(_, code) {
      return await deletePost(
        code,
        ({ data, status }) => {
          return { status, msg: "글 삭제 성공" };
        },
        (err) => {
          console.log(err);
        }
      );
    },
    initPost({ commit }) {
      commit(INIT_POST);
    },
    setSearch({ state }, newSearch) {
      state.search = newSearch;
    },
  },
};

export default boardStore;
