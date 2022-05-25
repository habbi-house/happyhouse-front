import Vue from "vue";
import Vuex from "vuex";
import boardStore from "@/store/modules/boardStore.js";
import houseStore from "@/store/modules/houseStore.js";
import userStore from "@/store/modules/userStore.js";
import { SHOW_MESSAGE, TOGGLE_CAMERA_MODAL } from "./mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { boardStore, houseStore, userStore },
  state: {
    isOpen: false,
    text: "",
    color: "",
    icon: "",
  },
  mutations: {
    [TOGGLE_CAMERA_MODAL]: (state) => {
      state.isOpen = !state.isOpen;
    },
    [SHOW_MESSAGE]: (state, { text, color, icon }) => {
      console.log("잘 작동 되고 있니?");
      state.text = text;
      state.color = color;
      state.icon = icon;
    },
  },
});
