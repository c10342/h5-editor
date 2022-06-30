<template>
  <el-button
    :type="buttonType"
    @click="onButtonClick"
    :loading="loading"
    class="upload-image-button"
    :class="{ 'block-button': block }"
    :icon="icon"
  >
    {{ text }}
  </el-button>
</template>

<script lang="ts">
import { showErrorMessage } from "@/utils/message";
import UploadImage from "@/utils/uploader";
import { isString } from "lodash-es";
import { defineComponent, onBeforeUnmount, ref } from "vue";
const imageType = ["image/png", "image/jpeg"];
export default defineComponent({
  name: "UploadImage",
  props: {
    buttonType: {
      type: String,
      default: "primary",
    },
    text: {
      type: String,
      default: "上传图片",
    },
    icon: {
      type: String,
      default: "UploadFilled",
    },
    block: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["success"],
  setup(props, context) {
    const loading = ref(false);
    const uploadImage = new UploadImage();
    uploadImage.interceptors.request.use((file: File) => {
      if (!imageType.includes(file.type)) {
        return Promise.reject("只能上传图片类型的文件");
      }
      loading.value = true;
      return file;
    });
    const onButtonClick = () => {
      uploadImage
        .start()
        .then((res: any) => {
          const urls = res.data.urls;
          if (urls && urls.length) {
            context.emit("success", urls[0]);
          }
        })
        .catch((error) => {
          if (isString(error)) {
            showErrorMessage(error);
          }
          console.log(error);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    onBeforeUnmount(() => {
      uploadImage.destroy();
    });
    return { onButtonClick, loading };
  },
});
</script>

<style lang="scss" scoped>
.upload-image-button {
  &.block-button {
    width: 100%;
  }
}
</style>
