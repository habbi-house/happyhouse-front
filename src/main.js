import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueApexCharts from "vue-apexcharts";

import "@/plugins/vee-validate.js";

Vue.config.productionTip = false;

Vue.use(VueApexCharts);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
