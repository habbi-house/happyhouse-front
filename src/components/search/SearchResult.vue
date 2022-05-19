<template>
  <v-card fixed elevation="1" height="100%">
    <v-navigation-drawer width="320" permanent>
      <v-list nav>
        <v-list-item v-for="(houseDeal, index) in houseDeals" :key="index" link>
          <v-list-item-content class="px-2 py-2">
            <!-- Img -->
            <v-img :src="houseDeal.src">
              <div class="pa-3 white--text apart-info">
                <span class="font-weight-bold">{{ houseDeal.aptName }}</span>
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
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: "SearchResult",
  data() {
    return {
      houseDeals: this.$store.state.houseDeals,
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
