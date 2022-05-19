<template>
  <v-container app class="d-flex pa-7">
    <v-card class="d-flex-column" width="100%" elevation="0">
      <!-- BreadCrumb -->
      <v-row>
        <board-header />
      </v-row>
      <!-- Search + AddPost Btn -->
      <v-row v-if="$route.path === '/board/list'" class="my-4 px-1">
        <v-text-field
          outlined
          dense
          placeholder="제목으로 검색"
          prepend-inner-icon="mdi-magnify"
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          elevation="0"
          class="white--text font-weight-bold"
          @click="moveWrite"
        >
          글 작성하기
        </v-btn>
      </v-row>
      <v-row>
        <router-view />
      </v-row>
    </v-card>
  </v-container>
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
