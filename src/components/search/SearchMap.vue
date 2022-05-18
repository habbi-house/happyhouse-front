<template>
  <v-row id="map" class="ma-0"></v-row>
</template>

<script>
export default {
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
    const script = document.createElement("script");

    /* global kakao */
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}&libraries=services`;
    script.onload = () => {
      kakao.maps.load(this.initMap);
    };
    document.head.appendChild(script);
  },
};
</script>

<style></style>
