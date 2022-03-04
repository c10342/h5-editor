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
  UploadFilled,
  Delete,
} from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "@/assets/styles/reset.css";
import "@/assets/styles/base.scss";
import "cropperjs/dist/cropper.css";

import CustomText from "@/components/custom-text/index";
import CustomImage from "@/components/custom-image/index";
import CustomShape from "@/components/custom-shape/index";
import RenderVNode from "@/components/render-vnode/index";
import UploadImage from "@/components/upload-image/index";
import CropperImage from "@/components/cropper-image/index";

const customComponents = [
  CustomText,
  CustomImage,
  CustomShape,
  RenderVNode,
  UploadImage,
  CropperImage,
];

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
  UploadFilled,
  Delete,
];

const app = createApp(App);
app.use(store).use(ElementPlus);

customComponents.forEach((component: any) => app.use(component));
iconsList.forEach((icon) => app.component(icon.name, icon));

app.mount("#app");
