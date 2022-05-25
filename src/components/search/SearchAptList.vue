<template>
  <v-navigation-drawer width="320" permanent>
    <v-list nav class="pa-0">
      <v-list-item class="ma-0">
        <v-list-item-content class="px-3">
          <v-list-item-title class="d-flex justify-end">
            <v-text-field
              outlined
              dense
              hide-details
              v-model="aptName"
              placeholder="아파트명으로 검색"
              :prepend-inner-icon="on ? 'mdi-microphone' : 'mdi-microphone-off'"
              @click:prepend-inner="() => (on = !on)"
              @change="searchByAptName"
            ></v-text-field>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="(house, index) in houses"
        :key="index"
        link
        :id="house.aptCode"
        @click="() => getHouseDetail(house.aptCode)"
      >
        <v-list-item-content class="px-3 pb-2">
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
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import sampleImg from "@/assets/sample.jpg";
import { SET_HOUSE } from "@/store/mutation-types";

const houseStore = "houseStore";

export default {
  name: "SearchAptList",
  data() {
    return {
      sampleImg,
      on: false,
      aptName: "",
    };
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
  },
  methods: {
    ...mapMutations(houseStore, [SET_HOUSE]),
    ...mapActions(houseStore, ["searchHouseDealByApt"]),
    async getHouseDetail(aptCode) {
      this.SET_HOUSE(aptCode);
      await this.searchHouseDealByApt();
      this.$router.push("search/" + aptCode);
    },
    searchByAptName() {
      this.$store.getters[""];
    },
  },
};
</script>

<style></style>
