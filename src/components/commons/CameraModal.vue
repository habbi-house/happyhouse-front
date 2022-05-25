<template>
  <v-dialog
    v-model="isOpen"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <span class="font-weight-bold">Are You 햅피?</span>
        <v-icon @click="closeModal">mdi-close</v-icon>
      </v-card-title>
      <v-card-text>
        <span>캠 정면을 응시해주세요.</span> <br /><br />
        <v-sheet width="100%">
          <video id="cam" width="100%" height="320px" hidden></video>
          <div v-if="!flag">
            <div :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`">
              <v-skeleton-loader
                type="image"
                height="320px"
              ></v-skeleton-loader>
            </div>
            <br />
            <div class="d-flex justify-end">
              <v-btn
                @click="startCam"
                color="primary"
                elevation="0"
                class="font-weight-bold"
                >시작</v-btn
              >
            </div>
          </div>
          <div v-else>
            <div>
              <canvas id="screen" :hidden="!flag"></canvas>
            </div>
            <br />
            <div class="d-flex justify-end">
              <v-btn
                @click="shootCam"
                color="primary"
                elevation="0"
                class="font-weight-bold"
                style="margin-top: -5px"
                >찰칵</v-btn
              >
            </div>
          </div>
        </v-sheet>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable prettier/prettier */
import {
  SHOW_MESSAGE,
  TOGGLE_CAMERA_MODAL,
  TOGGLE_DARK_MODE,
} from "@/store/mutation-types";
import { mapMutations, mapState } from "vuex";
import { analyzeFace, uploadFile } from "../api/camera";

let localMediaStream;

export default {
  name: "CameraModal",
  data() {
    return {
      flag: false,
      imgUrl: "",
    };
  },
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
  created() {},
  computed: {
    ...mapState(["isOpen"]),
  },
  methods: {
    ...mapMutations([TOGGLE_CAMERA_MODAL, TOGGLE_DARK_MODE, SHOW_MESSAGE]),
    closeModal() {
      this.flag = false;
      this.TOGGLE_CAMERA_MODAL();
      localMediaStream.getTracks()[0].stop(); // one media track
    },
    async startCam() {
      this.flag = true;
      await getVideo();
    },
    async shootCam() {
      const file = takePhoto();
      const fileName = "web_snapshot_" + Date.now() + ".png";

      let formData = new FormData();
      formData.append("file", file, fileName);

      await uploadFile(
        formData,
        ({ data, status }) => {
          if (status === 200) {
            this.imgUrl = data;
          }
        },
        (err) => {
          console.log(err);
        }
      );

      let emotions = [];
      await analyzeFace(
        this.imgUrl,
        (res) => {
          console.log(res.data[0]);
          if (res.data[0]) {
            emotions = res.data[0].faceAttributes.emotion;
          } else {
            this.SHOW_MESSAGE({
              text: "당신의 얼굴을 보여주세요 :)",
              color: "error",
              icon: "mdi-alert-outline",
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );

      this.closeModal();

      if (emotions) {
        const maxVal = Math.max(...Object.values(emotions));
        if (maxVal === emotions.happiness) {
          this.TOGGLE_DARK_MODE();
          this.SHOW_MESSAGE({
            text: "햅피하시군요 :)",
            color: "primary",
            icon: "mdi-robot-happy-outline",
          });
        } else {
          this.TOGGLE_DARK_MODE();
          this.SHOW_MESSAGE({
            text: "언햅피하시군요.. :(",
            color: "primary",
            icon: "mdi-robot-dead-outline",
          });
        }
      }
    },
  },
};

function paintVideoToCanvas() {
  const video = document.getElementById("cam");
  const canvas = document.getElementById("screen");
  const context = canvas.getContext("2d");

  canvas.width = 452;
  canvas.height = 320;

  // 영상의 이미지 데이터를 canvas에 16ms 간격으로 입력
  return setInterval(() => {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  }, 16);
}

async function getVideo() {
  const video = document.getElementById("cam");
  video.addEventListener("canplay", paintVideoToCanvas);

  await navigator.mediaDevices
    .getUserMedia({ video: true, audio: false }) // 카메라 장치에 접근
    .then((stream) => {
      // 브라우저가 인식 가능한 URL로 변환 후, 지정
      localMediaStream = stream; // 이후 stream 종료하기 위해 저장
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => {
      console.error("OH NO!", err);
    });
}

// Base64 -> Blob 변환
function dataURLtoBlob(dataUrl) {
  const binary = atob(dataUrl.split(",")[1]);

  let arr = [];
  for (let i = 0; i < binary.length; i++) {
    arr.push(binary.charCodeAt(i));
  }

  return new Blob([new Uint8Array(arr)], { type: "image/png" });
}

// Blob 형태의 파일 return
function takePhoto() {
  const video = document.getElementById("cam");
  const canvas = document.getElementById("screen");
  video.pause();

  return dataURLtoBlob(canvas.toDataURL("image/png", "multipart/form-data"));
}
</script>

<style>
#screen {
  border-radius: 4px;
  object-fit: cover;
}

.v-skeleton-loader.v-skeleton-loader--is-loading > .v-skeleton-loader__image {
  height: 100%;
}
</style>
