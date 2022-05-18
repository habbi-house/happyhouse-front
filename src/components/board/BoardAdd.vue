<template>
  <v-container>
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
    <v-row>
      <v-spacer />
      <v-btn @click="addPost" color="green lighten-1" class="white--text">
        등록
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BoardAdd",
  data() {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    addPost() {
      alert("글 작성 요청");
      this.title = "";
      this.content = "";
      this.$router.push({ name: "board" });
    },
  },
};
</script>

<style></style>
