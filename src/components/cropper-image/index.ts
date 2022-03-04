import { App } from "vue";
import CropperImage from "./index.vue";

CropperImage.install = (app: App) => {
  app.component(CropperImage.name, CropperImage);
};

export default CropperImage;
