<template>
  <v-container class="mx-0 px-0" fluid style="height: 100%">
    <v-card>
      <v-row class="px-5">
        <v-col cols="6">
          <search-input />
        </v-col>
      </v-row>
      <v-divider class="my-3"></v-divider>
      <v-row>
        <search-result />
        <!-- search map -->
      </v-row>
    </v-card>
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
