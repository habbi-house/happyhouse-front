<template>
  <v-container class="mt-4 px-4">
    <v-row>
      <v-text-field
        label="제목"
        hint="제목을 입력해주세요."
        outlined
        required
        maxlength="30"
        counter="30"
        v-model="title"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-textarea
        label="내용"
        hint="내용을 입력해주세요."
        outlined
        required
        maxlength="300"
        counter="300"
        v-model="content"
      ></v-textarea>
    </v-row>
    <br /><br />
    <v-row>
      <v-spacer />
      <v-btn
        @click="addPost"
        color="green lighten-1"
        elevation="0"
        class="white--text"
      >
        등록
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { SHOW_MESSAGE } from "@/store/mutation-types";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

const userStore = "userStore";
const boardStore = "boardStore";

export default {
  name: "BoardAdd",
  data() {
    return {
      title: "",
      content: "",
    };
  },
  computed: {
    ...mapState(userStore, ["user"]),
    ...mapState(boardStore, ["post"]),
    ...mapGetters(userStore, ["isLogin"]),
  },
  methods: {
    ...mapMutations([SHOW_MESSAGE]),
    ...mapActions(boardStore, ["createPost", "setBoardList"]),
    async addPost() {
      await this.createPost({
        title: this.title,
        content: this.content,
        originNo: this.post.originNo,
        groupLayer: this.post.groupLayer,
        writer: this.user.name,
        email: this.user.email,
      });
      this.setBoardList();
      this.$router.push({ name: "board" });
    },
    checkLogin() {
      if (!this.isLogin) {
        this.SHOW_MESSAGE({
          text: "로그인 후 이용해 주세요.",
          color: "error",
          icon: "mdi-alert-outline",
        });
        this.$router.push({ name: "signIn" });
      }
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>

<style></style>
