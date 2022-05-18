<template>
  <v-container class="elevation-0">
    <v-row justify="start" class="mb-3">
      <h2>찜 목록</h2>
    </v-row>
    <v-row>
      <v-layout wrap>
        <v-flex md4 v-for="item in wishList" :key="item.id">
          <v-card class="mr-3 my-3">
            <!-- 거래 정보 상세 페이지로 라우팅하면 될 듯 합니다.-->
            <router-link :to="{ name: 'index' }">
              <v-img :src="item.src">
                <div class="pa-3 white--text apart-info">
                  <span class="font-weight-bold">{{ item.aptName }}</span>
                  <br />
                  <span class="caption">
                    {{ item.floor }}, {{ item.dealDate }}
                  </span>
                  <br />
                  <span class="caption">{{ item.location }}</span>
                </div>
              </v-img>
              <span class="detail">상세 정보 보기</span>
            </router-link>
          </v-card>
        </v-flex>
      </v-layout>
    </v-row>
    <div style="display: flex"></div>
  </v-container>
</template>

<script>
import sampleImg from "@/assets/sample.jpg";

export default {
  data() {
    return {
      wishList: [
        {
          no: "1",
          aptName: "한남더힐",
          src: sampleImg,
          floor: "15층",
          location: "서울특별시 강남구 청담동",
          dealDate: "2022. 05. 19",
        },
        {
          no: "2",
          aptName: "한남더힐",
          src: sampleImg,
          floor: "15층",
          location: "서울특별시 강남구 청담동",
          dealDate: "2022. 05. 19",
        },
        {
          no: "3",
          aptName: "한남더힐",
          src: sampleImg,
          floor: "15층",
          location: "서울특별시 강남구 청담동",
          dealDate: "2022. 05. 19",
        },
        {
          no: "4",
          aptName: "한남더힐",
          src: sampleImg,
          floor: "15층",
          location: "서울특별시 강남구 청담동",
          dealDate: "2022. 05. 19",
        },
        {
          no: "5",
          aptName: "한남더힐",
          src: sampleImg,
          floor: "15층",
          location: "서울특별시 강남구 청담동",
          dealDate: "2022. 05. 19",
        },
        {
          no: "6",
          aptName: "한남더힐",
          src: sampleImg,
          floor: "15층",
          location: "서울특별시 강남구 청담동",
          dealDate: "2022. 05. 19",
        },
        {
          no: "7",
          aptName: "한남더힐",
          src: sampleImg,
          floor: "15층",
          location: "서울특별시 강남구 청담동",
          dealDate: "2022. 05. 19",
        },
        {
          no: "8",
          aptName: "한남더힐",
          src: sampleImg,
          floor: "15층",
          location: "서울특별시 강남구 청담동",
          dealDate: "2022. 05. 19",
        },
        {
          no: "4",
          aptName: "한남더힐",
          src: sampleImg,
          floor: "15층",
          location: "서울특별시 강남구 청담동",
          dealDate: "2022. 05. 19",
        },
        {
          no: "5",
          aptName: "한남더힐",
          src: sampleImg,
          floor: "15층",
          location: "서울특별시 강남구 청담동",
          dealDate: "2022. 05. 19",
        },
        {
          no: "6",
          aptName: "한남더힐",
          src: sampleImg,
          floor: "15층",
          location: "서울특별시 강남구 청담동",
          dealDate: "2022. 05. 19",
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
