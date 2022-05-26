<template>
  <v-card fixed elevation="1" height="100%">
    <search-apt-detail v-if="$route.params.id" />
    <search-apt-list v-else />
  </v-card>
</template>

<script>
import SearchAptList from "@/components/search/SearchAptList.vue";
import SearchAptDetail from "@/components/search/SearchAptDetail.vue";
import { mapMutations, mapState } from "vuex";
import { CLEAR_HOUSE_LIST } from "@/store/mutation-types";

const houseStore = "houseStore";
export default {
  name: "SearchResult",
  components: {
    SearchAptList,
    SearchAptDetail,
  },
  created() {
    if (this.moveFrom === null) {
      this.CLEAR_HOUSE_LIST();
    }
  },
  computed: {
    ...mapState(houseStore, ["moveFrom"]),
  },
  methods: {
    ...mapMutations(houseStore, [CLEAR_HOUSE_LIST]),
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
