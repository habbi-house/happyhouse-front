<template>
  <v-container class="elevation-0">
    <v-row justify="start" class="mb-3">
      <h2>찜 목록</h2>
    </v-row>
    <v-row>
      <v-layout wrap>
        <v-flex md4 v-for="item in this.wishInfos" :key="item.aptCode">
          <v-card class="mr-3 my-3">
            <router-link :to="{ path: `search/${item.aptCode}` }">
              <v-img :src="item.src">
                <div class="pa-3 white--text apart-info">
                  <span class="font-weight-bold">{{ item.apartmentName }}</span>
                  <br />
                  <span class="caption">{{ item.address }}</span>
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
import { mapActions, mapState } from "vuex";

const userStore = "userStore";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(userStore, ["user", "wishlist", "wishInfos"]),
  },
  async created() {
    await this.updateWishlist(this.user.email);
    this.getWishInfo(this.wishlist).then(() => {
      for (let wishInfo of this.wishInfos) {
        wishInfo.src = sampleImg;
      }
    });
  },
  methods: {
    ...mapActions(userStore, ["updateWishlist", "getWishInfo"]),
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
