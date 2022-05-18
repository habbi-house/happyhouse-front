<template>
  <v-container class="mx-0 px-0" fluid style="height: 100vh">
    <v-row class="px-5">
      <v-col cols="6">
        <search-input />
      </v-col>
    </v-row>
    <hr class="mt-3 mb-3" />
    <v-row>
      <search-result />
      <!-- search map -->
    </v-row>
  </v-container>
</template>

<script>
import SearchInput from "@/components/commons/SearchInput.vue";
import SearchResult from "@/components/search/SearchResult.vue";

export default {
  name: "SearchView",
  components: {
    SearchInput,
    SearchResult,
  },
};
</script>

<style>
hr {
  opacity: 50%;
}

side-bar {
  position: sticky;
}
</style>
