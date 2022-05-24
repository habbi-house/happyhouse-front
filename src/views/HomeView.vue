<template>
  <v-main app class="py-5">
    <search-banner />
    <slide-list />
  </v-main>
</template>

<script>
import SearchBanner from "@/components/home/SearchBanner.vue";
import SlideList from "@/components/home/SlideList.vue";

export default {
  name: "HomeView",

  components: {
    SearchBanner,
    SlideList,
  },
};
</script>
