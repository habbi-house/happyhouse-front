import Vue from "vue";
import Vuex from "vuex";
import sampleImg from "@/assets/sample.jpg";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: "frog",
      pwd: "q1w2e3r4",
      name: "깨꾹이",
      email: "frog@frog.com",
    },
    houseDeals: [
      {
        src: sampleImg,
        aptName: "더펜트하우스",
        location: "서울특별시 강남구 청담동",
        floor: "15층",
        dealDate: "2021. 11. 4",
      },
      {
        src: sampleImg,
        aptName: "효성빌라101",
        location: "서울특별시 강남구 청담동",
        floor: "15층",
        dealDate: "2021. 11. 4",
      },
      {
        src: sampleImg,
        aptName: "상일리츠빌",
        location: "서울특별시 강남구 청담동",
        floor: "15층",
        dealDate: "2021. 11. 4",
      },
      {
        src: sampleImg,
        aptName: "한남더힐",
        location: "서울특별시 강남구 청담동",
        floor: "15층",
        dealDate: "2021. 11. 4",
      },
      {
        src: sampleImg,
        aptName: "시그니엘",
        location: "서울특별시 강남구 청담동",
        floor: "15층",
        dealDate: "2021. 11. 4",
      },
    ],
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
