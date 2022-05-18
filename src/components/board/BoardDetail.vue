<template>
  <v-container>
    <br />
    <v-row>
      <v-text-field
        label="제목"
        outlined
        maxlength="30"
        counter="30"
        v-model="post.title"
        :readonly="boardAction != 'update'"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-text-field
        label="작성자"
        outlined
        maxlength="10"
        v-model="post.writer"
        readonly
      ></v-text-field>
    </v-row>
    <v-row>
      <v-textarea
        label="내용"
        outlined
        maxlength="300"
        counter="300"
        v-model="post.content"
        :readonly="boardAction != 'update'"
      ></v-textarea>
    </v-row>
    <v-row>
      <v-btn @click="movePage" color="blue" class="white--text">
        글 목록으로
      </v-btn>
      <v-spacer />
      <v-btn
        @click="moveUpdate"
        color="blue"
        class="white--text"
        v-if="boardAction === 'detail'"
      >
        수정하기
      </v-btn>
      <v-btn
        @click="deletePost"
        color="red"
        class="white--text"
        v-if="boardAction === 'update'"
      >
        삭제하기
      </v-btn>
      <v-btn
        @click="updatePost"
        color="blue"
        class="white--text"
        v-if="boardAction === 'update'"
      >
        저장하기
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BoardDetail",
  data() {
    return {
      boardAction: "detail",
      post: {
        articleno: this.$route.params.articleno,
        title: "테스트용 글 제목",
        content: "내용없음",
        writer: "김테스트",
        date: "20xx.xx.xx",
        hit: "13",
      },
    };
  },
  methods: {
    movePage() {
      this.$router.push({ name: "board" });
    },
    moveUpdate() {
      this.boardAction = "update";
    },
    updatePost() {
      alert("update호출");
      this.boardAction = "detail";
    },
    deletePost() {
      alert("delete호출");
      this.movePage();
    },
  },
};
</script>

<style></style>
