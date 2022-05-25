import axios from "axios";
import { getApiInstance } from ".";

const api = getApiInstance();

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

// TODO: FACE API 호출

export { uploadFile, deleteFile };
