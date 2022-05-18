<template>
  <v-app>
    <app-bar />
    <v-main>
      <router-view />
    </v-main>
    <app-footer v-if="$route.path !== '/search'" />
  </v-app>
</template>

<script>
import AppBar from "@/components/commons/AppBar.vue";
import AppFooter from "@/components/commons/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppBar,
    AppFooter,
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
</style>
