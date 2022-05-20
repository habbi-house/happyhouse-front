<template>
  <v-app-bar app color="white" elevation="1" class="px-4">
    <!-- 좌측 -->
    <div class="d-flex align-center">
      <div class="d-flex align-center mr-1">
        <v-app-bar-title class="font-weight-bold">
          <router-link :to="{ name: 'index' }" class="d-flex align-center">
            <v-icon color="gray darken-2">mdi-robot-happy</v-icon>&nbsp;
            햅피하우스
          </router-link>
        </v-app-bar-title>
        &nbsp;&nbsp;
      </div>
      <div class="d-flex flex-nowrap gray--text">
        <router-link :to="{ name: 'search' }" class="ml-5">
          실거래가 조회
        </router-link>
        <router-link :to="{ name: 'board' }" class="ml-5">
          자유게시판
        </router-link>
        <!-- <router-link :to="{ name: 'camera' }" class="ml-5">
            Are You 햅피?
          </router-link> -->
      </div>
    </div>

    <v-spacer></v-spacer>

    <!-- 우측: 사용자 관련 -->
    <div v-if="user">
      <router-link :to="{ name: 'mypage' }">
        <v-icon color="primary" large>mdi-account-circle</v-icon>
      </router-link>
    </div>
    <div v-else>
      <v-btn
        :to="{ name: 'signIn' }"
        color="white"
        elevation="0"
        class="no-uppercase mr-4 font-weight-bold gray--text"
      >
        Sign In
      </v-btn>
      <v-btn
        :to="{ name: 'signUp' }"
        color="primary"
        elevation="0"
        class="no-uppercase font-weight-bold white--text"
      >
        Sign Up
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      // user: this.$store.state.user,
    };
  },
};
</script>

<style></style>
