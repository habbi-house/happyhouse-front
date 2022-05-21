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
    let accessToken = vueCookies.get("accessToken");
    let refreshToken = vueCookies.get("refreshToken");
    if (accessToken) {
      this.setToken({ accessToken, refreshToken });
      this.setEmail(vueCookies.get("email"));
    } else {
      // refresh토큰이 있다면 access토큰 재발급
      console.log("토큰 없음");
    }
  },
  methods: {
    ...mapActions(userStore, ["setToken", "setEmail"]),
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
