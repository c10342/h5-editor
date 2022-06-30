<template>
  <div class="image-list">
    <UploadImage @success="onUploadImageSuccess" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getImageDimensions } from "@/utils/hepler";
import { ComponentData, GlobalDataProps } from "@/types/store";
import { v4 as uuidv4 } from "uuid";
import { imageDefaultProps } from "@/default-props";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore<GlobalDataProps>();
    const addImageComponent = (url: string) => {
      // 获取图片的真实高度
      getImageDimensions(url).then(({ width }) => {
        const maxWidth = 373;
        const newComponent: ComponentData = {
          id: uuidv4(),
          name: "custom-image",
          isHidden: false,
          isLocked: false,
          layerName: `图层${store.state.components.length + 1}`,
          props: {
            ...imageDefaultProps,
            imageSrc: url,
            width: (maxWidth > width ? width : maxWidth) + "px",
          },
        };
        store.commit("addComponent", newComponent);
      });
    };

    const onUploadImageSuccess = (url: string) => {
      addImageComponent(url);
    };
    return {
      onUploadImageSuccess,
    };
  },
});
</script>
