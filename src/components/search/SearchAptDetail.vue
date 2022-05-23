<template>
  <v-navigation-drawer width="320" permanent>
    <v-list nav class="pa-0">
      <v-list-item class="ma-0">
        <v-list-item-content class="py-0 px-1">
          <v-list-item-title class="d-flex justify-end">
            <v-icon @click="goBack">mdi-close</v-icon>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <!-- 아파트 세부 정보 -->
      <v-list-item class="px-4">
        <v-list-item-content>
          <div class="d-flex align-center mt-1 mb-4">
            <h2>아파트 세부 정보</h2>
            <v-spacer></v-spacer>
            <v-icon v-if="toggleWish" @click="toggle" color="red lighten-2"
              >mdi-heart-outline</v-icon
            >
            <v-icon v-else @click="toggle" color="red lighten-2"
              >mdi-heart</v-icon
            >
          </div>
          <v-img :src="sampleImg" class="mb-3"></v-img>
          <v-simple-table>
            <tbody>
              <tr>
                <td>이름</td>
                <td>{{ house.apartmentName }}</td>
              </tr>
              <tr>
                <td>주소</td>
                <td>{{ house.dong + " " + house.roadName }}</td>
              </tr>
              <tr>
                <td>건축년도</td>
                <td>{{ house.buildYear }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-list-item-content>
      </v-list-item>
      <!-- 아파트 거래 내역 -->
      <v-list-item>
        <v-list-item-content>
          <h2 class="px-2 mb-4">거래 내역</h2>
          <apexchart
            type="line"
            height="250"
            :options="chartOptions"
            :series="series"
            class="pr-2"
          ></apexchart>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import sampleImg from "@/assets/sample.jpg";
import { mapState } from "vuex";
import VueApexCharts from "vue-apexcharts";

const houseStore = "houseStore";
export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      sampleImg,
      toggleWish: true,
      series: [{ name: "실거래가", data: [] }],
      chartOptions: {
        chart: {
          type: "line",
          height: 250,
        },
        stroke: {
          curve: "straight",
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: "최근 거래 내역",
          align: "left",
        },
        markers: {
          hover: {
            sizeOffset: 4,
          },
        },
        xaxis: {
          categories: {},
        },
      },
    };
  },
  created() {
    this.series[0].data = this.recentDeals.map((x) => x.amount).reverse();
    this.chartOptions.xaxis.categories = this.recentDeals
      .map((x) => x.date)
      .reverse();
  },
  computed: {
    ...mapState(houseStore, ["house", "houseDeals", "recentDeals"]),
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    toggle() {
      this.toggleWish = !this.toggleWish;
    },
  },
};
</script>

<style>
tr > td:first-child {
  font-weight: 600;
  color: rgb(158, 158, 158);
}
</style>
