import axios from "axios";
import { ElMessage } from "element-plus";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEzNDI3NDkxMDUzIiwiX2lkIjoiNjIwMWZjYTY4NzU1NDIwOGZmN2QwNDAzIiwiaWF0IjoxNjQ2MzY2NzE4LCJleHAiOjE2NDY1Mzk1MTh9.q7HU_-eiaNt18iSuC6xSyu1fE3jLZGunP3E6GI7jjTk";

const instance = axios.create();

instance.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.authorization = token;
  return config;
});

instance.interceptors.response.use((resp) => {
  const res = resp.data;
  if (res.errno !== 0) {
    ElMessage.error(res.message || "请求失败");
  }
  return res;
});

export default instance;
