<template>
  <v-navigation-drawer width="320" permanent>
    <v-list nav class="pa-0">
      <v-list-item class="ma-0" v-if="houses.length != 0">
        <v-list-item-content class="px-3">
          <v-list-item-title class="d-flex justify-end">
            <v-text-field
              outlined
              dense
              hide-details
              v-model="aptName"
              placeholder="아파트명으로 검색"
              :append-icon="on ? 'mdi-microphone' : 'mdi-microphone-off'"
              @click:append="voiceInput"
            ></v-text-field>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="(house, index) in searchedHouses"
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
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import sampleImg from "@/assets/sample.jpg";
import { SET_HOUSE } from "@/store/mutation-types";

const houseStore = "houseStore";

export default {
  name: "SearchAptList",
  data() {
    return {
      sampleImg,
      on: false,
      recognition: {},
    };
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
    ...mapGetters(houseStore, ["searchWord", "searchedHouses"]),

    aptName: {
      get() {
        return this.searchWord;
      },
      set(newSearch) {
        this.setSearchWord(newSearch);
      },
    },
  },
  created() {
    this.voiceSearchReady();
  },
  methods: {
    ...mapMutations(houseStore, [SET_HOUSE]),
    ...mapActions(houseStore, ["searchHouseDealByApt", "setSearchWord"]),
    async getHouseDetail(aptCode) {
      this.SET_HOUSE(aptCode);
      await this.searchHouseDealByApt();
      this.$router.push("search/" + aptCode);
    },
    voiceSearchReady() {
      window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new window.SpeechRecognition();
      this.recognition.interimResults = true;
      //console.log(this.recognition);
      this.recognition.addEventListener("result", (e) => {
        //console.log(e.results[0][0].transcript);
        this.aptName = e.results[0][0].transcript;
      });
    },
    voiceInput() {
      this.on = true;
      setTimeout(() => {
        this.on = false;
        this.recognition.stop();
      }, 5000);
      this.recognition.start();
    },
  },
};
</script>

<style></style>
