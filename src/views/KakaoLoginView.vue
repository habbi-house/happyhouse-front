<template>
  <div>로그인 중...</div>
</template>

<script>
import axios from "axios";

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
    getToken() {
      axios
        .get("http://localhost:8888/user/kakao?code=" + this.code)
        .then((res) => {
          console.log(res);
          this.$router.push("/");
        });
      // user에 저장
    },
  },
};
</script>

<style></style>
