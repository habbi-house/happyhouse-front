<template>
  <v-navigation-drawer width="320" permanent>
    <v-list nav>
      <v-list-item
        v-for="(house, index) in houses"
        :key="index"
        link
        :id="house.aptCode"
        @click="getHouseDetail(house.aptCode)"
      >
        <v-list-item-content class="px-2 py-2">
          <!-- Img -->
          <v-img :src="sampleImg">
            <div class="pa-3 white--text apart-info">
              <span class="font-weight-bold">{{ house.apartmentName }}</span>
              <br />
              <span class="caption">{{
                house.dong + " " + house.roadName
              }}</span>
            </div>
          </v-img>
          <span class="detail">상세 보기</span>
          <!-- <v-btn color="white" width="100%" elevation="0">상세 보기</v-btn> -->
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import sampleImg from "@/assets/sample.jpg";

const houseStore = "houseStore";

export default {
  name: "SearchAptList",
  data() {
    return {
      sampleImg,
    };
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
  },
  methods: {
    ...mapMutations(houseStore, ["SET_HOUSE"]),
    ...mapActions(houseStore, ["searchHouseDealByApt"]),
    getHouseDetail(aptCode) {
      this.SET_HOUSE(aptCode);
      this.searchHouseDealByApt();
      this.$router.push("search/" + aptCode);
    },
  },
};
</script>

<style></style>
