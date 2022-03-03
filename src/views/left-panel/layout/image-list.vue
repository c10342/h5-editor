<template>
  <div class="image-list">
    <el-button
      type="primary"
      @click="onButtonClick"
      :loading="loading"
      class="upload-image-button"
    >
      上传图片
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, ref } from "vue";
import UploadImage from "@/utils/upload-image";
import { getImageDimensions } from "@/utils/hepler";
import { ComponentData, GlobalDataProps } from "@/types/store";
import { v4 as uuidv4 } from "uuid";
import { imageDefaultProps } from "@/default-props";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const uploadImage = new UploadImage();
    const loading = ref(false);
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
          layerName: "图层",
          props: {
            ...imageDefaultProps,
            src: url,
            width: (maxWidth > width ? width : maxWidth) + "px",
          },
        };
        store.commit("addComponent", newComponent);
      });
    };
    const onButtonClick = () => {
      uploadImage
        .beforeUpload((file: File) => {
          loading.value = true;
          return file;
        })
        .start()
        .then((res: any) => {
          const urls = res.data.urls;
          if (urls && urls.length) {
            addImageComponent(urls[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    onBeforeUnmount(() => {
      uploadImage.destroy();
    });
    return {
      onButtonClick,
      loading,
    };
  },
});
</script>

<style lang="scss" scoped>
.image-list {
  .upload-image-button {
    width: 100%;
  }
}
</style>
