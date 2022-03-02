import request from "../utils/request";

export const uploadImage = (formData: FormData) =>
  request.post("/api/utils/upload-img", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
