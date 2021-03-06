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
      <!-- 아파트 매입 버튼 -->
      <v-list-item class="d-flex justify-center px-4 mb-6">
        <v-btn
          color="primary font-weight-bold"
          elevation="0"
          width="100%"
          @click="buyHouse"
        >
          아파트 매입
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
/* eslint-disable no-unused-vars */
import sampleImg from "@/assets/sample.jpg";
import { ethers } from "ethers";
import { mapActions, mapMutations, mapState } from "vuex";
import VueApexCharts from "vue-apexcharts";
import { SHOW_MESSAGE } from "@/store/mutation-types";

const houseStore = "houseStore";
const userStore = "userStore";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      sampleImg,
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
    this.setAptCode(this.$route.path.split("/")[2]);
    this.setHouseInfo(this.house.aptCode);
    this.searchHouseDealByApt();
    this.series[0].data = this.recentDeals.map((x) => x.amount).reverse();
    this.chartOptions.xaxis.categories = this.recentDeals
      .map((x) => x.date)
      .reverse();
  },
  computed: {
    ...mapState(userStore, ["user", "wishlist"]),
    ...mapState(houseStore, ["house", "houseDeals", "recentDeals"]),
    toggleWish: function () {
      for (let aptCode of this.wishlist) {
        if (aptCode === this.house.aptCode) {
          return false;
        }
      }
      return true;
    },
  },
  methods: {
    ...mapMutations([SHOW_MESSAGE]),
    ...mapActions(userStore, ["updateWishlist"]),
    ...mapActions(houseStore, [
      "addWish",
      "deleteWish",
      "searchHouseDealByApt",
      "setAptCode",
      "setHouseInfo",
    ]),
    goBack() {
      this.$router.back();
    },
    async toggle() {
      if (this.toggleWish) {
        await this.addWish(this.user.email).then(({ status, msg }) => {
          this.SHOW_MESSAGE({
            text: msg,
            color: "error",
            icon: "mdi-heart-multiple",
          });
        });
      } else {
        await this.deleteWish(this.user.email).then(({ status, msg }) => {
          this.SHOW_MESSAGE({
            text: msg,
            color: "gray",
            icon: "mdi-delete-outline",
          });
        });
      }
      await this.updateWishlist(this.user.email);
    },
    async buyHouse() {
      if (typeof window.ethereum !== "undefined") {
        await eth_tx().then(({ status, msg }) => {
          this.SHOW_MESSAGE({
            text: msg,
            color: status === 200 ? "success" : "error",
            icon:
              status === 200 ? "mdi-check-circle-outline" : "mdi-alert-outline",
          });
        });
      }
    },
  },
};

async function eth_tx() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = accounts[0];

  return window.ethereum
    .request({
      method: "eth_sendTransaction",
      params: [
        {
          from: accounts[0], //매입자
          to: "0xa41d5874d92067B41e541A69A27b0ced261050aD", //매도자(현재 소유주):변경 요!!!
          value: "0x29a2241af62c0000", //매입가 3ETH
          gasPrice: "0x09184e72a000",
          gas: "0x2710",
        },
      ],
    })
    .then(async (txHash) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const usdc = {
        address: "0x53f1F06c3C6Bf3292989b8E1b533c5C4FE3befe7", //스마트 컨트랙트 주소:변경 요!!!
        abi: [
          "function buyRealEstate(uint _id, address _buyerAddress, uint _price) public  returns (string)",
        ],
      };
      let userAddress = await signer.getAddress();
      const usdcContract = new ethers.Contract(usdc.address, usdc.abi, signer);
      const tx = await usdcContract.buyRealEstate(101, userAddress, 3);

      const result = await tx.wait();
      return { status: 200, msg: "거래 성공" };
    })
    .catch((error) => {
      console.log(error);
      return { status: 500, msg: "거래 실패" };
    });
}
</script>

<style>
tr > td:first-child {
  font-weight: 600;
  color: rgb(158, 158, 158);
}
</style>
