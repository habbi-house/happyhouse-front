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

function getApiInstance() {
  return instance;
}

export { getApiInstance };
