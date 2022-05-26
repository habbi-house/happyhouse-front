<template>
  <v-container class="elevation-0">
    <v-row justify="start" class="mb-3">
      <h2>찜 목록</h2>
    </v-row>
    <v-row>
      <v-layout wrap v-if="this.wishlist.length != 0">
        <v-flex md4 v-for="item in this.wishInfos" :key="item.aptCode">
          <v-card class="mr-3 my-3" @click="moveToWish(item.aptCode)">
            <v-img :src="item.src">
              <div class="pa-3 white--text apart-info">
                <span class="font-weight-bold">{{ item.apartmentName }}</span>
                <br />
                <span class="caption">{{ item.address }}</span>
              </div>
            </v-img>
            <span class="detail">상세 정보 보기</span>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout wrap v-else>
        <v-flex class="px-3">
          <br />
          <v-row class="mb-1">
            <h3>찜한 매물이 없어요... 😢</h3>
          </v-row>
          <br />
          <v-row>
            <router-link :to="{ name: 'search' }">
              <h3>매물 구경하러 가기 ↗</h3>
            </router-link>
          </v-row>
        </v-flex>
      </v-layout>
    </v-row>
    <div style="display: flex"></div>
  </v-container>
</template>

<script>
import sampleImg from "@/assets/sample.jpg";
import { mapActions, mapMutations, mapState } from "vuex";

const userStore = "userStore";
const houseStore = "houseStore";

export default {
  data() {
    return {
      ...mapState(houseStore, ["moveFrom"]),
    };
  },
  computed: {
    ...mapState(userStore, ["user", "wishlist", "wishInfos"]),
  },
  async created() {
    await this.updateWishlist(this.user.email);
    if (this.wishlist.length != 0) {
      this.getWishInfo(this.wishlist).then(() => {
        for (let wishInfo of this.wishInfos) {
          wishInfo.src = sampleImg;
        }
      });
    }
  },
  methods: {
    ...mapMutations(houseStore, ["SET_MOVE_FROM"]),
    ...mapActions(userStore, ["updateWishlist", "getWishInfo"]),
    moveToWish(aptCode) {
      this.SET_MOVE_FROM("wish");
      this.$router.push({
        path: `search/${aptCode}`,
      });
    },
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
