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
import UploadImage from "@/utils/upload-image";
import { defineComponent, onBeforeUnmount, ref } from "vue";

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
    const uploadImage = new UploadImage();
    const loading = ref(false);
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
            context.emit("success", urls[0]);
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
