<template>
  <v-container app fill-height>
    <v-row class="d-flex align-center justify-center">
      <v-col cols="11" sm="7" md="5">
        <sign-in-form />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignInForm from "@/components/SignInForm.vue";
import { mapGetters } from "vuex";

const userStore = "userStore";

export default {
  name: "SignInView",
  components: {
    SignInForm,
  },
  computed: {
    ...mapGetters(userStore, ["isLogin"]),
  },
  watch: {
    isLogin: function () {
      this.checkLogin();
    },
  },
  methods: {
    checkLogin() {
      if (this.isLogin) {
        this.$router.push("/");
      }
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>

<style></style>
