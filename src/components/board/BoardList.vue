<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-text-field
          solo
          placeholder="제목으로 검색"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="1">
        <v-btn color="orange" class="white--text" @click="moveWrite">
          글 작성하기
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="boardItems"
          :page.sync="page"
          :items-per-page="5"
          hide-default-footer
          @page-count="pageCount = $event"
          @click:row="viewPost"
        >
        </v-data-table>
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  names: "BoardList",
  data() {
    return {
      page: 1,
      pageCount: 0,
      headers: [
        {
          text: "번호",
          align: "start",
          sortable: false,
          value: "articleno",
        },
        { text: "제목", value: "title" },
        { text: "작성자", value: "writer" },
        { text: "작성일", value: "date" },
        { text: "조회수", value: "hit" },
      ],
      // 더미데이터
      boardItems: [
        {
          articleno: "1",
          title: "title",
          writer: "writer",
          date: "date",
          hit: "hit",
        },
        {
          articleno: "2",
          title: "title2",
          writer: "writer2",
          date: "date2",
          hit: "hit2",
        },
        {
          articleno: "3",
          title: "title3",
          writer: "writer3",
          date: "date3",
          hit: "hit3",
        },
        {
          articleno: "4",
          title: "title4",
          writer: "writer4",
          date: "date4",
          hit: "hit4",
        },
        {
          articleno: "5",
          title: "title5",
          writer: "writer5",
          date: "date5",
          hit: "hit5",
        },
        {
          articleno: "6",
          title: "title6",
          writer: "writer6",
          date: "date6",
          hit: "hit6",
        },
        {
          articleno: "7",
          title: "title7",
          writer: "writer7",
          date: "date7",
          hit: "hit7",
        },
        {
          articleno: "8",
          title: "title8",
          writer: "writer8",
          date: "date8",
          hit: "hit8",
        },
        {
          articleno: "9",
          title: "title9",
          writer: "writer9",
          date: "date9",
          hit: "hit9",
        },
      ],
    };
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardAdd" });
    },
    viewPost(post) {
      this.$router.push({
        name: "boardDetail",
        params: { articleno: post.articleno },
      });
    },
  },
};
</script>

<style></style>
