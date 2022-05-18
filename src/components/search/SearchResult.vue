<template>
  <v-card class="pl-5 pr-2 overflow-y-auto y-scroll">
    <v-list>
      <v-list-item v-for="(houseDeal, index) in houseDeals" :key="index">
        <v-card elevation="0" class="my-2">
          <!-- Img -->
          <img :src="houseDeal.src" width="256" /><br />
          <v-btn color="white" width="100%" elevation="0">상세 보기</v-btn>
        </v-card>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import sampleImg from "@/assets/sample.jpg";

export default {
  name: "SearchResult",
  data() {
    return {
      houseDeals: [
        { src: sampleImg },
        { src: sampleImg },
        { src: sampleImg },
        { src: sampleImg },
      ],
    };
  },
};
</script>

<style></style>
