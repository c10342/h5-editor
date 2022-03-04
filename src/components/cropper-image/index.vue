<template>
  <div class="cropper-image-container" :class="{ block: block }">
    <el-dialog
      v-model="dialogVisible"
      title="图片裁剪"
      @opened="onDialogOpened"
      @closed="onDialogClosed"
    >
      <div class="image-cropper">
        <img :src="imageSrc" ref="imageRef" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false"> 取消 </el-button>
          <el-button
            :loading="croppering"
            type="primary"
            @click="onConfirmClick"
          >
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-button
      :type="buttonType"
      @click="onButtonClick"
      class="cropper-image-button"
      :icon="icon"
    >
      {{ text }}
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Cropper from "cropperjs";
import { uploadImage as uploadImageApi } from "@/api/index";

interface CropperData {
  x: number;
  y: number;
  height: number;
  width: number;
}

export default defineComponent({
  name: "CropperImage",
  props: {
    buttonType: {
      type: String,
      default: "primary",
    },
    text: {
      type: String,
      default: "裁剪图片",
    },
    icon: {
      type: String,
      default: "Plus",
    },
    block: {
      type: Boolean,
      default: true,
    },
    imageSrc: {
      type: String,
    },
  },
  emits: ["success"],
  setup(props, context) {
    let cropperData: CropperData | null;
    let cropper: Cropper | null;
    const dialogVisible = ref(false);
    const croppering = ref(false);
    const imageRef = ref<HTMLImageElement | null>(null);
    const onButtonClick = () => {
      dialogVisible.value = true;
    };
    const onDialogOpened = () => {
      if (imageRef.value) {
        cropper = new Cropper(imageRef.value, {
          crop(event) {
            const detail = event.detail;
            if (detail) {
              cropperData = {
                x: Math.floor(detail.x),
                y: Math.floor(detail.y),
                height: Math.floor(detail.height),
                width: Math.floor(detail.width),
              };
            }
          },
        });
      }
    };
    const onDialogClosed = () => {
      cropper?.destroy();
      cropper = null;
      cropperData = null;
    };
    const onConfirmClick = () => {
      if (cropperData) {
        cropper?.getCroppedCanvas().toBlob((blob) => {
          if (blob) {
            const formData = new FormData();
            formData.append("file", blob, "test.png");
            croppering.value = true;
            uploadImageApi(formData)
              .then((res) => {
                const data = res.data;
                if (data.urls && data.urls.length) {
                  context.emit("success", data.urls[0]);
                }
                dialogVisible.value = false;
              })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => {
                croppering.value = false;
              });
          }
        });
      }
    };
    return {
      onButtonClick,
      croppering,
      dialogVisible,
      imageRef,
      onDialogClosed,
      onConfirmClick,
      onDialogOpened,
    };
  },
});
</script>

<style lang="scss" scoped>
.cropper-image-container {
  &.block {
    .cropper-image-button {
      width: 100%;
    }
  }

  .image-cropper {
    img {
      display: block;
      max-width: 100%;
    }
  }
}
</style>
