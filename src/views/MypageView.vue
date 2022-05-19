<template>
  <v-container class="pa-7">
    <v-row class="d-flex justify-space-between">
      <v-col cols="12" sm="8" md="3">
        <user-info />
      </v-col>
      <v-col cols="12" sm="10" md="8">
        <wish-list />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserInfo from "@/components/user/UserInfo.vue";
import WishList from "@/components/user/WishList.vue";

export default {
  name: "MypageView",
  components: {
    UserInfo,
    WishList,
  },
};
</script>

<style></style>
