<template>
  <v-breadcrumbs
    :items="breadCrumbs"
    divider=">"
    large
    class="pl-2 font-weight-bold"
  >
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item :to="item.to" :href="item.href">
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  names: "BoardHeader",
  computed: {
    breadCrumbs() {
      if (typeof this.$route.meta.breadCrumb === "function") {
        return this.$route.meta.breadCrumb.call(this, this.$route);
      }
      return this.$route.meta.breadCrumb;
    },
  },
};
</script>

<style></style>
