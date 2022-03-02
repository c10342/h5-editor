import { App } from "vue";
import CustomShape from "./index.vue";

CustomShape.install = (app: App) => {
  app.component(CustomShape.name, CustomShape);
};

export default CustomShape;
