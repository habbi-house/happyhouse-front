<template>
  <v-container class="elevation-1">
    <v-row justify="center">
      <h2>찜 목록</h2>
    </v-row>
    <v-layout wrap>
      <v-flex md4 v-for="item in wishList" :key="item.id">
        <v-card style="margin: 8px">
          <!-- 거래 정보 상세 페이지로 라우팅하면 될 듯 합니다.-->
          <router-link :to="{ name: 'index' }">
            <v-card-title v-text="item.aptName"></v-card-title>
            <v-img :src="item.src"></v-img>
          </router-link>
        </v-card>
      </v-flex>
    </v-layout>
    <div style="display: flex"></div>
  </v-container>
</template>

<script>
import sampleImg from "@/assets/sample.jpg";

export default {
  data() {
    return {
      wishList: [
        { no: "1", aptName: "test", src: sampleImg },
        { no: "2", aptName: "test", src: sampleImg },
        { no: "3", aptName: "test", src: sampleImg },
        { no: "4", aptName: "test", src: sampleImg },
        { no: "5", aptName: "test", src: sampleImg },
        { no: "6", aptName: "test", src: sampleImg },
        { no: "7", aptName: "test", src: sampleImg },
        { no: "8", aptName: "test", src: sampleImg },
        { no: "4", aptName: "test", src: sampleImg },
        { no: "5", aptName: "test", src: sampleImg },
        { no: "6", aptName: "test", src: sampleImg },
        { no: "7", aptName: "test", src: sampleImg },
        { no: "8", aptName: "test", src: sampleImg },
      ],
    };
  },
};
</script>

<style></style>
