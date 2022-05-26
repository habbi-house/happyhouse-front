<template>
  <div>로그인 중...</div>
</template>

<script>
import { SHOW_MESSAGE } from "@/store/mutation-types";
import { mapActions, mapGetters, mapMutations } from "vuex";

const userStore = "userStore";

export default {
  data() {
    return {
      code: "",
    };
  },
  created() {
    this.code = this.$route.query.code;
    this.getToken();
  },
  methods: {
    ...mapMutations([SHOW_MESSAGE]),
    ...mapActions(userStore, ["loginKakao"]),

    async getToken() {
      await this.loginKakao(this.code).then(({ status, msg }) => {
        this.SHOW_MESSAGE({
          text: msg,
          color: status === 200 ? "success" : "error",
          icon:
            status === 200 ? "mdi-check-circle-outline" : "mdi-alert-outline",
        });

        if (status === 200) {
          this.$router.push("/");
        } else {
          this.$router.push("/sign-in");
        }
      });
    },
  },
  computed: {
    ...mapGetters(userStore, ["isLogin"]),
  },
};
</script>

<style></style>
