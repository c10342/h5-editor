<template>
  <UploadImage v-if="!modelValue" @success="onUploadImageSuccess" />
  <div v-else class="background-process-container">
    <div
      class="image-wrapper"
      :style="{ 'background-image': modelValue }"
    ></div>
    <div class="button-wrapper ml-20">
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
        :imageSrc="imageSrc"
        @success="onCropperImageSuccess"
      />
      <el-button
        class="mt-5"
        type="danger"
        icon="Delete"
        @click="onDeleteImage"
      >
        删除图片
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const reg = /^url\("(.*)"\)$/;
    const imageSrc = computed(() => {
      if (!props.modelValue) {
        return "";
      }
      const arr = props.modelValue.match(reg);
      return arr ? arr[1] : "";
    });
    const onUploadImageSuccess = (url: string) => {
      context.emit("change", `url("${url}")`);
    };
    const onCropperImageSuccess = (url: string) => {
      context.emit("change", `url("${url}")`);
    };
    const onDeleteImage = () => {
      context.emit("change", "");
    };
    return {
      onUploadImageSuccess,
      onCropperImageSuccess,
      imageSrc,
      onDeleteImage,
    };
  },
});
</script>

<style lang="scss" scoped>
.background-process-container {
  display: flex;
  flex-direction: row;
  width: 100%;

  .image-wrapper {
    width: 130px;
    height: 110px;
    border: 1px dashed #e6ebed;
    background: no-repeat 50% / contain;
    box-sizing: border-box;
  }
}
</style>
