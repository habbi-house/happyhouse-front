<template>
  <v-main>
    <v-container>
      <v-row>
        <board-header />
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
