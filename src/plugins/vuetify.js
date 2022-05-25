import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {},
    themes: {
      light: {
        bgColor: "white",
        lightBgColor: "white",
        primary: "#FFB300",
        gray: "#656565",
        // gray: "#A0A0A0",
        lightgray: "#9D9D9D",
        kakao: "#FFE502",
      },
      dark: {
        bgColor: "#1E1E1E",
        lightBgColor: "#242424",
        primary: "#FFB800",
        gray: "#BABABA",
        lightgray: "#F8F8F8",
        kakao: "#FFE502",
      },
    },
  },
});
