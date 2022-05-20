import axios from "axios";

function getApiInstance() {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_BASE_URL}`,
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

export { getApiInstance };
