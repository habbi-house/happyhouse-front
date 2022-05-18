<template>
  <v-main>
    <v-container>
      <v-row>
        <board-header />
      </v-row>
      <v-row v-if="$route.path === '/board/boardlist'">
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
        <router-view />
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import BoardHeader from "@/components/board/BoardHeader.vue";

export default {
  name: "BoardView",
  components: {
    BoardHeader,
  },
};
</script>

<style></style>
