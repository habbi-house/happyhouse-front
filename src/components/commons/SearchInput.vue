<template>
  <v-container>
    <v-row>
      <v-col cols="3" class="pl-0 py-1">
        <v-select
          :items="sidos"
          v-model="sido"
          label="시, 도"
          hide-details
          :outlined="isSearch"
          :dense="isSearch"
          @change="getGungus"
        />
      </v-col>
      <v-col cols="3" class="pl-0 py-1">
        <v-select
          :items="gungus"
          v-model="gungu"
          label="군, 구"
          hide-details
          :outlined="isSearch"
          :dense="isSearch"
          @change="getDongs"
        />
      </v-col>
      <v-col cols="3" class="pl-0 py-1">
        <v-select
          :items="dongs"
          item-text="name"
          v-model="dong"
          label="동"
          hide-details
          :outlined="isSearch"
          :dense="isSearch"
          @change="setDong"
        />
      </v-col>
      <v-col cols="1" class="pl-0 py-1">
        <div v-if="isSearch">
          <v-btn
            color="primary"
            class="font-weight-bold"
            height="40px"
            elevation="0"
            @click="searchHouse"
            ><v-icon>mdi-magnify</v-icon></v-btn
          >
        </div>
        <div v-else>
          <v-btn color="primary" class="mt-3 font-weight-bold" elevation="0">
            찾기
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "searchInput",
  data() {
    return {
      isSearch: this.$route.path === "/search",
      sido: "",
      gungu: "",
      dong: "",
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "gungus", "dongs"]),
  },
  created() {
    this.loadAddress();
  },
  methods: {
    ...mapMutations(houseStore, [
      "SET_SIDO",
      "SET_GUNGU",
      "SET_DONG",
      "SET_DONG_CODE",
      "SET_GUNGU_LIST",
      "SET_DONG_LIST",
    ]),
    ...mapActions(houseStore, ["loadAddress", "searchHouseByDong"]),
    getGungus() {
      this.SET_SIDO(this.sido);
      this.SET_GUNGU_LIST();
    },
    getDongs() {
      this.SET_GUNGU(this.gungu);
      this.SET_DONG_LIST();
    },
    setDong() {
      this.SET_DONG(this.dong);
      this.SET_DONG_CODE();
    },
    searchHouse() {
      this.searchHouseByDong();
    },
  },
};
</script>

<style></style>
