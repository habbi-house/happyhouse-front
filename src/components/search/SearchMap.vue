<template>
  <v-row id="map" class="ma-0"></v-row>
</template>

<script>
/* eslint-disable prettier/prettier */
import { mapActions, mapMutations, mapState } from "vuex";

const houseStore = "houseStore";
const imgSrc =
  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

export default {
  data() {
    return {
      map: null,
    };
  },
  computed: {
    ...mapState(houseStore, ["moveFrom"]),
    ...mapState(houseStore, ["sido", "gungu", "dong", "house", "houses"]),
  },
  watch: {
    houses(arr) {
      // houses 변경 시, 중앙 위치 + 마커 위치 변경
      let centerLoc = [this.sido, this.gungu, this.dong].join(" ");
      if (this.moveFrom === "wish") {
        centerLoc = this.house.dong + " " + this.house.jibun;
        this.SET_MOVE_FROM(null);
      }
      this.showCenterLocation(centerLoc);
      // 주소명 -> 좌표로 변환 후, 지도 위에 찍기
      arr.forEach((house) => {
        const geocoder = new kakao.maps.services.Geocoder();
        const addressName = house.dong + " " + house.jibun;

        const imgSize = new kakao.maps.Size(24, 35);
        const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

        geocoder.addressSearch(addressName, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const pos = {
              title: house.apartmentName,
              latlng: new kakao.maps.LatLng(result[0].y, result[0].x),
            };

            // eslint-disable-next-line no-unused-vars
            const marker = new kakao.maps.Marker({
              map: this.map,
              position: pos.latlng,
              title: pos.title,
              image: markerImage,
            });

            const infoWindow = new kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:6px 0;border-radius:5px;"">${pos.title}</div>`, // 인포 윈도우에 표시할 내용
            });

            kakao.maps.event.addListener(
              marker,
              "mouseover",
              this.makeOverListener(this.map, marker, infoWindow)
            );
            kakao.maps.event.addListener(
              marker,
              "mouseout",
              this.makeOutListener(infoWindow)
            );

            kakao.maps.event.addListener(marker, "onmouseover", () => {
              this.displayInfoWindow(marker);
            });

            // 클릭 시 상세 보기로 이동
            kakao.maps.event.addListener(marker, "click", () => {
              this.$router.push({
                name: "aptDetail",
                params: { id: house.aptCode },
              });
            });
          }
        });
      });
    },
  },
  methods: {
    ...mapMutations(houseStore, ["SET_MOVE_FROM"]),
    ...mapActions(houseStore, ["searchHouseByDong", "setDongCode"]),
    initMap() {
      this.container = document.getElementById("map");

      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      this.map = new kakao.maps.Map(this.container, options);
      this.showCenterLocation("서울특별시 강남구 테헤란로 212");
      if (this.moveFrom === "wish") {
        this.setDongCode(this.house.dongCode);
        this.searchHouseByDong();
      } else if (this.moveFrom === "home") {
        this.searchHouseByDong();
        this.SET_MOVE_FROM(null);
      }
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
    makeOverListener(map, marker, infoWindow) {
      return () => infoWindow.open(map, marker);
    },
    makeOutListener(infoWindow) {
      return () => infoWindow.close();
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

<style>
.info-title {
  display: block;
  background: #50627f;
  color: #fff;
  text-align: center;
  height: 24px;
  line-height: 22px;
  border-radius: 4px;
  padding: 0px 10px;
}
</style>
