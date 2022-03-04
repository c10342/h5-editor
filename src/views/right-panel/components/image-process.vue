<template>
  <div class="image-process-container">
    <div class="image-wrapper">
      <img :src="modelValue" class="preview-image" />
    </div>
    <div class="button-wrapper">
      <UploadImage
        text="更换图片"
        buttonType="default"
        :block="false"
        icon="Upload"
        @success="onUploadImageSuccess"
      />
      <CropperImage
        class="mt-5"
        buttonType="default"
        :block="false"
        :imageSrc="modelValue"
        @success="onCropperImageSuccess"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["change"],
  setup(props, context) {
    const onUploadImageSuccess = (url: string) => {
      context.emit("change", url);
    };
    const onCropperImageSuccess = (url: string) => {
      context.emit("change", url);
    };
    return {
      onUploadImageSuccess,
      onCropperImageSuccess,
    };
  },
});
</script>

<style lang="scss" scoped>
.image-process-container {
  display: flex;
  flex-direction: row;
  width: 100%;

  .button-wrapper {
    margin-left: 20px;
  }
  .image-wrapper {
    width: 150px;
    height: 84px;
    .preview-image {
      display: block;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
