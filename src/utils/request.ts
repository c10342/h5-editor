import axios from "axios";
import { ElMessage } from "element-plus";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEzNDI3NDkxMDUzIiwiX2lkIjoiNjIwMWZjYTY4NzU1NDIwOGZmN2QwNDAzIiwiaWF0IjoxNjQ5NDI5MzAxLCJleHAiOjE2NDk2MDIxMDF9.cJTl83BWDgnaF2czebjCxvAaMmMzfj6Tff9v2qDd1s8";

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
