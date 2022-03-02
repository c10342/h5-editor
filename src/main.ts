import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

import ElementPlus from "element-plus";
import {
  Document,
  Picture,
  Burger,
  Upload,
  Plus,
  Lock,
  Unlock,
  VideoPause,
  VideoPlay,
  Ship,
} from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "@/assets/styles/reset.css";
import "cropperjs/dist/cropper.css";

import CustomText from "@/components/custom-text/index";
import CustomImage from "@/components/custom-image/index";
import CustomShape from "@/components/custom-shape/index";
import RenderVNode from "@/components/render-vnode/index";

const customComponents = [CustomText, CustomImage, CustomShape, RenderVNode];

const iconsList = [
  Document,
  Picture,
  Burger,
  Upload,
  Plus,
  Lock,
  Unlock,
  VideoPause,
  VideoPlay,
  Ship,
];

const app = createApp(App);
app.use(store).use(ElementPlus);

customComponents.forEach((component: any) => app.use(component));
iconsList.forEach((icon) => app.component(icon.name, icon));

app.mount("#app");
