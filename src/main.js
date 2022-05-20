import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import vueCookies from "vue-cookies";

import "@/plugins/vee-validate.js";

Vue.config.productionTip = false;
Vue.use(vueCookies);
Vue.$cookies.config("7d", "", "", true);

new Vue({
  router,
  store,
  vuetify,

  render: (h) => h(App),
}).$mount("#app");
