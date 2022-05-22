<template>
  <v-card fixed elevation="1" height="100%">
    <search-apt-detail v-if="$route.params.id" />
    <search-apt-list v-else />
  </v-card>
</template>

<script>
import SearchAptList from "@/components/search/SearchAptList.vue";
import SearchAptDetail from "@/components/search/SearchAptDetail.vue";

export default {
  name: "SearchResult",
  components: {
    SearchAptList,
    SearchAptDetail,
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
