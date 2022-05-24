/* eslint-disable */
import axios from "axios";
import vueCookies from "vue-cookies";

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}`,
  headers: {
    "Content-type": "application/json",
  },
});
const token = vueCookies.get("token");

instance.defaults.headers.common["Authorization"] = token
  ? `Bearer ${token}`
  : null;

instance.defaults.withCredentials = true;

instance.interceptors.response.use(
  function (response) {
    return response;
  },

  function ({ response }) {
    console.log(response);
    if (response.data.status === 444) {
      alert("다시 로그인 해주세요.");
      location.href = `${process.env.VUE_APP_VUE_BASE_URL}`;
    }
    return Promise.reject(response);
  }
);

function getApiInstance() {
  return instance;
}

export { getApiInstance };
