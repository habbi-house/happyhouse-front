<template>
  <v-main app class="py-5">
    <search-banner />
    <!-- News Crawling + Board -->
    <!-- <board-list /> -->
    <slide-list />
  </v-main>
</template>

<script>
import SearchBanner from "@/components/home/SearchBanner.vue";
// import BoardList from "@/components/board/BoardList.vue";
import SlideList from "@/components/home/SlideList.vue";

export default {
  name: "HomeView",

  components: {
    SearchBanner,
    // BoardList,
    SlideList,
  },
};
</script>
