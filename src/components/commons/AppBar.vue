<template>
  <v-app-bar app color="bgColor" elevation="1" class="px-4">
    <!-- 좌측 -->
    <div class="d-flex align-center">
      <div class="d-flex align-center mr-1">
        <v-app-bar-title class="font-weight-bold">
          <router-link :to="{ name: 'index' }" class="d-flex align-center logo">
            <span v-if="this.$vuetify.theme.dark" style="width: 148px">
              <v-icon color="gray darken-2">mdi-robot-dead</v-icon>&nbsp;
              언햅피하우스
            </span>
            <span v-else style="width: 142px">
              <v-icon color="gray darken-2">mdi-robot-happy</v-icon>&nbsp;
              햅피하우스
            </span>
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
        color="bgColor"
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
        color="bgColor"
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
import { SHOW_MESSAGE, TOGGLE_CAMERA_MODAL } from "@/store/mutation-types";

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
    ...mapMutations([TOGGLE_CAMERA_MODAL, SHOW_MESSAGE]),
    ...mapActions(userStore, ["logout"]),
    async submitLogout() {
      await this.logout().then(({ status, msg }) => {
        this.SHOW_MESSAGE({
          text: msg,
          color: status === 200 ? "success" : "warning",
          icon:
            status === 200 ? "mdi-check-circle-outline" : "mdi-alert-outline",
        });
      });

      setTimeout(() => {
        location.reload();
      }, 2000);
    },
    toggleModal() {
      this.TOGGLE_CAMERA_MODAL();
    },
  },
};
</script>

<style></style>
