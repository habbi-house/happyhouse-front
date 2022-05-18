<template>
  <v-main app class="pt-5">
    <search-banner />
    <!-- News Crawling + Board -->
  </v-main>
</template>

<script>
import SearchBanner from "@/components/home/SearchBanner.vue";

export default {
  name: "HomeView",

  components: {
    SearchBanner,
  },
};
</script>
