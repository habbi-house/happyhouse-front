<template>
  <v-container>
    <v-row>
      <v-col class="px-0">
        <v-data-table
          class="row-pointer"
          :headers="headers"
          :items="posts"
          :page.sync="page"
          :items-per-page="5"
          hide-default-footer
          @page-count="pageCount = $event"
          @click:row="viewPost"
        >
        </v-data-table>
        <br />
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

const boardStore = "boardStore";

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
          value: "code",
        },
        { text: "제목", value: "title" },
        { text: "작성자", value: "writer" },
        { text: "작성일", value: "reg_datetime" },
      ],
    };
  },
  computed: {
    ...mapGetters(boardStore, ["posts"]),
  },
  created() {
    this.setBoardList();
  },
  methods: {
    ...mapActions(boardStore, ["setBoardList"]),
    viewPost(post) {
      this.$router.push({
        name: "boardDetail",
        params: { articleno: post.code },
      });
    },
  },
};
</script>

<style scoped>
.row-pointer >>> tbody tr:hover {
  cursor: pointer;
}
</style>
