<template>
  <v-container app class="d-flex justify-center align-center" fill-height>
    <v-card class="d-flex-column" width="100%" elevation="0">
      <v-row class="mb-4"><h1>자유 게시판</h1></v-row>
      <v-row v-if="$route.path === '/board/boardlist'">
        <v-col cols="4" class="px-0">
          <v-text-field
            outlined
            dense
            placeholder="제목으로 검색"
            prepend-inner-icon="mdi-magnify"
            hide-details
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="1" class="px-0">
          <v-btn
            color="primary"
            elevation="0"
            class="white--text font-weight-bold"
            @click="moveWrite"
          >
            글 작성하기
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <router-view />
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "BoardView",
};
</script>

<style></style>
