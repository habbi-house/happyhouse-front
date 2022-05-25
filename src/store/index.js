import Vue from "vue";
import Vuex from "vuex";
import boardStore from "@/store/modules/boardStore.js";
import houseStore from "@/store/modules/houseStore.js";
import userStore from "@/store/modules/userStore.js";
import { TOGGLE_CAMERA_MODAL } from "./mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { boardStore, houseStore, userStore },
  state: {
    isOpen: false,
  },
  mutations: {
    [TOGGLE_CAMERA_MODAL]: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});
