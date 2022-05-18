<template>
  <v-app>
    <v-app-bar app color="white" elevation="1" class="px-4">
      <div class="d-flex align-center">
        <div class="d-flex align-center mr-1">
          <v-icon color="gray darken-2">mdi-robot-happy</v-icon>&nbsp;&nbsp;
          <v-app-bar-title class="font-weight-bold">
            <router-link :to="{ name: 'index' }" class="no-underline"
              >햅피하우스</router-link
            > </v-app-bar-title
          >&nbsp;&nbsp;
        </div>
        <div class="d-flex flex-nowrap">
          <router-link :to="{ name: 'search' }" class="ml-5 no-underline"
            >실거래가 조회</router-link
          >
          <router-link :to="{ name: 'board' }" class="ml-5 no-underline"
            >자유 게시판</router-link
          >
          <router-link class="ml-5 no-underline">Are You 햅피?</router-link>
        </div>
      </div>

      <v-spacer></v-spacer>

      <v-btn color="white" class="no-uppercase mr-4 font-weight-bold"
        >Sign In</v-btn
      >
      <v-btn color="orange" class="no-uppercase font-weight-bold"
        >Sign Up</v-btn
      >
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
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

.no-underline {
  text-decoration: none;
  color: inherit;
}
</style>
