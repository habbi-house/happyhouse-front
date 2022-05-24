<template>
  <div>로그인 중...</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
    ...mapActions(userStore, ["loginKakao"]),

    async getToken() {
      await this.loginKakao(this.code);
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters(userStore, ["isLogin"]),
  },
};
</script>

<style></style>
