<template>
  <v-app style="position: relative">
    <app-bar />
    <v-main
      :style="
        $route.path === '/search' ? 'height: 100vh; max-height: 100%' : ''
      "
    >
      <router-view :style="$route.path === '/search' ? 'height: 100%' : ''" />
    </v-main>
    <app-footer v-if="$route.path !== '/search'" />
  </v-app>
</template>

<script>
/* eslint-disable */
import AppBar from "@/components/commons/AppBar.vue";
import AppFooter from "@/components/commons/AppFooter.vue";
import vueCookies from "vue-cookies";
import { mapActions } from "vuex";

const userStore = "userStore";

export default {
  name: "App",
  components: {
    AppBar,
    AppFooter,
  },
  created() {
    let token = vueCookies.get("token");
    if (token) {
      this.setUser(token);
      let accessToken = vueCookies.get("accessToken");
      let refreshToken = vueCookies.get("refreshToken");
      if (accessToken) {
        this.setToken({ accessToken, refreshToken });
      } else {
        this.getUserByNo();
      }
    }
  },
  methods: {
    ...mapActions(userStore, ["setToken", "setUser", "getUserByNo"]),
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");

$body-font-family: "Noto Sans KR";

$typoOptions: display-4, display-3, display-2, display-1, headline, title,
  subtitle-1, subtitle-2, body-1, body-2, caption, overline;
#app {
  font-family: $body-font-family, sans-serif !important;
  @each $typoOption in $typoOptions {
    .#{$typoOption} {
      font-family: $body-font-family, sans-serif !important;
    }
  }
}

.no-uppercase {
  text-transform: unset !important;
}

a {
  text-decoration: none;
  color: inherit !important;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
