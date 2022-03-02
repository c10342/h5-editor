import { App } from "vue";
import CustomText from "./index.vue";

CustomText.install = (app: App) => {
  app.component(CustomText.name, CustomText);
};

export default CustomText;
