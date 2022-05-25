import Vue from "vue";
import Vuetify from "../plugins/vuetify";
import Vuex from "vuex";
import boardStore from "@/store/modules/boardStore.js";
import houseStore from "@/store/modules/houseStore.js";
import userStore from "@/store/modules/userStore.js";
import {
  SHOW_MESSAGE,
  TOGGLE_CAMERA_MODAL,
  TOGGLE_DARK_MODE,
} from "./mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { boardStore, houseStore, userStore },
  state: {
    isDark: false,
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
      state.text = text;
      state.color = color;
      state.icon = icon;
    },
    [TOGGLE_DARK_MODE]: (state, { isDark }) => {
      Vuetify.framework.theme.dark = isDark;
      state.isDark = isDark;
    },
  },
});
