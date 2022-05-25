<template>
  <v-app style="position: relative">
    <app-bar />
    <v-main
      :style="
        $route.path.startsWith('/search')
          ? `height: 100vh; max-height: 100%; background: ` +
            (isDark ? '#242424' : 'white')
          : `background: ` + (isDark ? '#242424' : 'white')
      "
    >
      <router-view :style="$route.path === '/search' ? 'height: 100%' : ''" />
    </v-main>
    <app-footer v-if="!$route.path.startsWith('/search')" />
    <snack-bar></snack-bar>
  </v-app>
</template>

<script>
/* eslint-disable */
import AppBar from "@/components/commons/AppBar.vue";
import AppFooter from "@/components/commons/AppFooter.vue";
import SnackBar from "@/components/commons/SnackBar.vue";
import { mapActions, mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "App",
  components: {
    AppBar,
    AppFooter,
    SnackBar,
  },
  created() {
    this.refreshUser();
  },
  computed: {
    ...mapState(["isDark"]),
  },
  methods: {
    ...mapActions(userStore, ["refreshUser"]),
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
