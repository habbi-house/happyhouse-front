<template>
  <v-container class="mx-0 px-0" fluid style="height: 100%">
    <v-card>
      <v-row class="px-5">
        <v-col cols="6">
          <search-input />
        </v-col>
      </v-row>
      <v-divider class="my-3"></v-divider>
      <v-row>
        <search-result />
        <!-- search map -->
        <v-row id="map"></v-row>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import SearchInput from "@/components/commons/SearchInput.vue";
import SearchResult from "@/components/search/SearchResult.vue";

export default {
  name: "SearchView",
  components: {
    SearchInput,
    SearchResult,
  },
  data() {
    return {
      map: null,
    };
  },
  methods: {
    initMap() {
      this.container = document.getElementById("map");

      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      this.map = new kakao.maps.Map(this.container, options);
      this.showCenterLocation("서울특별시 강남구 대치동");
    },
    showCenterLocation(address) {
      const geocoder = new kakao.maps.services.Geocoder();
      const tempMap = this.map;
      geocoder.addressSearch(address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          // 결과값으로 받은 위치를 마커로 표시
          const marker = new kakao.maps.Marker({
            map: tempMap,
            position: coords,
          });

          // 인포 윈도우로 장소에 대한 설명을 표시
          var infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;border-radius:5px;">${address}</div>`,
          });
          infowindow.open(tempMap, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          tempMap.panTo(coords);
        }
      });
    },
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");

      /* global kakao */
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}&libraries=services`;
      script.onload = () => {
        kakao.maps.load(this.initMap);
      };
      document.head.appendChild(script);
    }
  },
};
</script>

<style>
hr {
  opacity: 50%;
}

side-bar {
  position: sticky;
}
</style>
