<template>
  <div>로그인 중...</div>
</template>

<script>
import axios from "axios";
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
    ...mapActions(userStore, ["setToken", "setEmail"]),

    getToken() {
      console.log("getToken");
      axios
        .get("http://localhost:8888/user/kakao?code=" + this.code)
        .then(({ data }) => {
          console.log(data);
          this.setToken(data);
          this.setEmail(data.email);
          axios.defaults.headers.common["x-access-token"] = data.accessToken;
        })
        .catch((err) => {
          console.log(err);
          alert("로그인에 실패했습니다.");
        })
        .finally(() => {
          this.$router.push("/");
        });
    },
    getters: {
      ...mapGetters(userStore, ["isLogin"]),
    },
  },
};
</script>

<style></style>
