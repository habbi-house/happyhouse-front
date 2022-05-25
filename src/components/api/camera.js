import axios from "axios";
import { getApiInstance } from ".";

const api = getApiInstance();

const subscriptionKey = process.env.VUE_APP_FACE_SUBSCRIPTION_KEY;
const endpoint = process.env.VUE_APP_FACE_ENDPOINT + "/face/v1.0/detect";

// AWS S3로 파일 업로드
async function uploadFile(imgFile, success, fail) {
  await axios
    .post(`${process.env.VUE_APP_API_BASE_URL}/s3/upload`, imgFile, {
      header: { "Content-Type": "multipart/form-data" },
    })
    .then(success)
    .catch(fail);
}

// AWS S3에 올린 파일 삭제
async function deleteFile(imgUrl, success, fail) {
  await api.post(`/s3/delete`, imgUrl).then(success).catch(fail);
}

// FACE API 호출
async function analyzeFace(imgUrl, success, fail) {
  await axios({
    method: "post",
    url: endpoint,
    params: {
      detectionModel: "detection_01",
      returnFaceId: true,
      returnFaceLandmarks: false,
      returnFaceAttributes: "emotion",
    },
    data: {
      url: imgUrl,
    },
    headers: { "Ocp-Apim-Subscription-Key": subscriptionKey },
  })
    .then(success)
    .catch(fail);
}

export { uploadFile, deleteFile, analyzeFace };
