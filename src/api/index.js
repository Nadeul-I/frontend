import axios from "axios";

function apiInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json; charset=UTF-8`",
      "Access-Control-Allow-Origin": "*",
      withCredentials: true,
    },
  });
  return instance;
}

export { apiInstance };
