<template>
  <v-container app class="mx-0 pa-0" fluid style="height: calc(100%-64px)">
    <v-row class="my-0 px-5">
      <!-- search input -->
      <v-col cols="6">
        <search-input />
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-container class="pa-0" style="height: calc(100%-73px)" fluid>
      <v-row class="ma-0 d-flex justify-center">
        <!-- search result -->
        <search-result />
        <!-- search map -->
        <search-map />
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import SearchInput from "@/components/commons/SearchInput.vue";
import SearchResult from "@/components/search/SearchResult.vue";
import SearchMap from "@/components/search/SearchMap.vue";

export default {
  name: "SearchView",
  components: {
    SearchInput,
    SearchResult,
    SearchMap,
  },
};
</script>

<style>
hr {
  opacity: 50%;
}
</style>
