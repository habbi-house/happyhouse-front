<template>
  <v-container class="px-5">
    <v-row>
      <v-col cols="7" class="d-flex align-center">
        <div>
          <h1 style="font-size: 2rem" class="mb-3">
            어떤 집에서 살고 싶으신가요?
          </h1>
          <h3 class="gray--text mb-4">
            원하는 집의 <span class="primary--text">실거래가</span>를
            확인하세요.
          </h3>
          <search-input />
        </div>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="5"
        ><v-img
          :src="isDark ? unHappyHouseImg : happyHouseImg"
          contain
          class="rounded"
      /></v-col>
    </v-row>
  </v-container>
</template>

<script>
import happyHouseImg from "@/assets/happy-house.jpg";
import unHappyHouseImg from "@/assets/unhappy-house.png";
import SearchInput from "@/components/commons/SearchInput.vue";
import { mapState } from "vuex";

export default {
  name: "SearchBanner",
  components: {
    SearchInput,
  },
  data() {
    return {
      happyHouseImg,
      unHappyHouseImg,
    };
  },
  computed: {
    ...mapState(["isDark"]),
  },
};
</script>
