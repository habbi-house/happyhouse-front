<template>
  <v-container>
    <v-row>
      <v-col cols="3" class="pl-0 py-1">
        <v-select
          :items="sidos"
          v-model="sido"
          label="시, 도"
          hide-details
          :outlined="isSearch"
          :dense="isSearch"
        />
      </v-col>
      <v-col cols="3" class="pl-0 py-1">
        <v-select
          :items="gungus"
          v-model="gungu"
          label="군, 구"
          hide-details
          :outlined="isSearch"
          :dense="isSearch"
        />
      </v-col>
      <v-col cols="3" class="pl-0 py-1">
        <v-select
          :items="dongs"
          v-model="dong"
          label="동"
          hide-details
          :outlined="isSearch"
          :dense="isSearch"
        />
      </v-col>
      <v-col cols="1" class="pl-0 py-1">
        <div v-if="isSearch">
          <v-btn
            color="primary"
            class="font-weight-bold"
            height="40px"
            elevation="0"
            ><v-icon>mdi-magnify</v-icon></v-btn
          >
        </div>
        <div v-else>
          <v-btn color="primary" class="mt-3 font-weight-bold" elevation="0">
            찾기
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "searchInput",
  data() {
    return {
      isSearch: this.$route.path === "/search",
      sido: "",
      gungu: "",
      dong: "",
      // 이후 vuex로 관리
      sidos: ["서울특별시", "경기도"],
      gungus: ["강남구", "송파구"],
      dongs: ["역삼동", "잠실동"],
    };
  },
};
</script>

<style></style>
