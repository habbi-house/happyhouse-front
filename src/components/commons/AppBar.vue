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
        <a @click="toggleModal" class="ml-5"> Are You 햅피? </a>
        <camera-modal></camera-modal>
      </div>
    </div>

    <v-spacer></v-spacer>

    <!-- 우측: 사용자 관련 -->
    <div v-if="isLogin">
      <v-btn
        @click="submitLogout"
        color="white"
        elevation="0"
        class="no-uppercase mr-4 font-weight-bold gray--text"
      >
        Logout
      </v-btn>
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
import CameraModal from "@/components/commons/CameraModal.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { TOGGLE_CAMERA_MODAL } from "@/store/mutation-types";

const userStore = "userStore";

export default {
  components: { CameraModal },
  data() {
    return {
      user: null,
      // user: this.$store.state.user,
    };
  },
  computed: {
    ...mapGetters(userStore, ["isLogin"]),
  },
  methods: {
    ...mapMutations([TOGGLE_CAMERA_MODAL]),
    ...mapActions(userStore, ["logoutUser", "logout"]),
    submitLogout() {
      this.logout();
      location.reload();
    },
    toggleModal() {
      this.TOGGLE_CAMERA_MODAL();
    },
  },
};
</script>

<style></style>
