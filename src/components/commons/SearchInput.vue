<template>
  <v-container>
    <v-row>
      <v-col cols="3" class="pl-0">
        <v-select :items="sidos" v-model="sido" label="시, 도" />
      </v-col>
      <v-col cols="3" class="pl-0">
        <v-select :items="gungus" v-model="gungu" label="군, 구" />
      </v-col>
      <v-col cols="3" class="pl-0">
        <v-select :items="dongs" v-model="dong" label="동" />
      </v-col>
      <v-col cols="1" class="pl-0">
        <v-btn color="primary" class="mt-3 font-weight-bold" elevation="0">
          찾기
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
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
