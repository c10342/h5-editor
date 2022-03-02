import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

import ElementPlus from "element-plus";
import { Document, Picture, Burger } from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "@/assets/styles/reset.css";

import CustomText from "@/components/custom-text/index";
import CustomImage from "@/components/custom-image/index";
import CustomShape from "@/components/custom-shape/index";

const customComponents = [CustomText, CustomImage, CustomShape];

const app = createApp(App);
app.use(store).use(ElementPlus);

app.component("Document", Document);
app.component("Picture", Picture);
app.component("Burger", Burger);

customComponents.forEach((component: any) => app.use(component));

app.mount("#app");
