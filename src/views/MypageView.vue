<template>
  <v-container>
    <v-row>
      <v-col cols="7">
        <div>
          <h1>마이페이지</h1>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <user-info />
      </v-col>
      <v-col cols="9">
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
