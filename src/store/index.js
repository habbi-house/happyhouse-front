import Vue from "vue";
import Vuex from "vuex";
import boardStore from "@/store/modules/boardStore.js";
import houseStore from "@/store/modules/houseStore.js";
import userStore from "@/store/modules/userStore.js";

Vue.use(Vuex);

// const user = {
//   id: "frog",
//   pwd: "q1w2e3r4",
//   name: "깨꾹이",
//   email: "frog@frog.com",
// };

export default new Vuex.Store({
  modules: { boardStore, houseStore, userStore },
  state: {
    // user: user,
  },
});
