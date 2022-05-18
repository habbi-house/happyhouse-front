<template>
  <v-card class="overflow-y-auto y-scroll" fixed elevation="1">
    <v-list>
      <v-list-item v-for="(houseDeal, index) in houseDeals" :key="index" link>
        <v-list-item-content class="pl-5 pr-2">
          <!-- Img -->
          <v-img :src="houseDeal.src" width="256">
            <div class="pa-3 white--text apart-info">
              <span class="font-weight-bold">{{ houseDeal.apartName }}</span>
              <br />
              <span class="caption">
                {{ houseDeal.floor }}, {{ houseDeal.dealDate }}
              </span>
              <br />
              <span class="caption">{{ houseDeal.location }}</span>
            </div>
          </v-img>
          <span class="detail">상세 보기</span>
          <!-- <v-btn color="white" width="100%" elevation="0">상세 보기</v-btn> -->
        </v-list-item-content>
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
        {
          src: sampleImg,
          apartName: "더펜트하우스",
          location: "서울특별시 강남구 청담동",
          floor: "15층",
          dealDate: "2021. 11. 4",
        },
        {
          src: sampleImg,
          apartName: "효성빌라101",
          location: "서울특별시 강남구 청담동",
          floor: "15층",
          dealDate: "2021. 11. 4",
        },
        {
          src: sampleImg,
          apartName: "상일리츠빌",
          location: "서울특별시 강남구 청담동",
          floor: "15층",
          dealDate: "2021. 11. 4",
        },
        {
          src: sampleImg,
          apartName: "한남더힐",
          location: "서울특별시 강남구 청담동",
          floor: "15층",
          dealDate: "2021. 11. 4",
        },
        {
          src: sampleImg,
          apartName: "시그니엘",
          location: "서울특별시 강남구 청담동",
          floor: "15층",
          dealDate: "2021. 11. 4",
        },
      ],
    };
  },
};
</script>

<style>
.apart-info {
  position: absolute;
  bottom: 0;
}

.detail {
  display: inline-block;
  padding: 10px 0;
  width: 100%;
  text-align: center;
}
</style>
