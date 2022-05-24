/* eslint-disable */
import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}`,
  headers: {
    "Content-type": "application/json",
  },
});

instance.defaults.withCredentials = true;

instance.interceptors.response.use(
  function (response) {
    return response;
  },

  async function (error) {
    const { config, response } = error;
    const originalRequest = config;
    if (response.data.status === 444) {
      const { data } = await instance.get(`/user/refresh`);
      instance.defaults.headers.common.Authorization = `Bearer ${data}`;
      originalRequest.headers.Authorization = `Bearer ${data}`;
      return instance(originalRequest);
    } else if (response.data.status === 445) {
      if (originalRequest.url != "/user/refresh") {
        alert(response.data.message);
        location.href = `${process.env.VUE_APP_VUE_BASE_URL}/sign-in`;
      }
    }
    return Promise.reject(error);
  }
);

function getApiInstance() {
  return instance;
}

export { getApiInstance };
