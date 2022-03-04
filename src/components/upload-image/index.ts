import { App } from "vue";
import UploadImage from "./index.vue";

UploadImage.install = (app: App) => {
  app.component(UploadImage.name, UploadImage);
};

export default UploadImage;
