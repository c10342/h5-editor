import { App } from "vue";
import CustomImage from "./index.vue";

CustomImage.install = (app: App) => {
  app.component(CustomImage.name, CustomImage);
};

export default CustomImage;
