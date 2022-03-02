<template>
  <div class="image-process-container">
    <el-dialog
      v-model="dialogVisible"
      title="图片裁剪"
      @opened="onDialogOpened"
      @closed="onDialogClosed"
    >
      <div class="image-cropper">
        <img :src="modelValue" ref="imageRef" />
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
    <div class="img-button-wrapper">
      <div class="image-wrapper">
        <img :src="modelValue" class="preview-image" />
      </div>
      <div class="button-wrapper">
        <el-button @click="onUploadClick" :loading="loading">
          <el-icon><Upload /></el-icon>
          更换图片
        </el-button>
        <el-button class="cropper-button" @click="onCropperClick">
          <el-icon><Plus /></el-icon>
          裁剪图片
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UploadImage from "@/utils/upload-image";
import { defineComponent, onBeforeUnmount, ref } from "vue";
import Cropper from "cropperjs";
import { uploadImage as uploadImageApi } from "@/api/index";

interface CropperData {
  x: number;
  y: number;
  height: number;
  width: number;
}

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["change"],
  setup(props, context) {
    const uploadImage = new UploadImage();
    const loading = ref(false);
    const croppering = ref(false);
    const dialogVisible = ref(false);
    const imageRef = ref<HTMLImageElement | null>(null);

    let cropperData: CropperData | null;
    let cropper: Cropper | null;
    const emitChange = (res: any) => {
      const data = res.data;
      if (data.urls && data.urls.length) {
        context.emit("change", data.urls[0]);
      }
    };
    const onUploadClick = () => {
      uploadImage
        .beforeUpload((file) => {
          loading.value = true;
          return file;
        })
        .start()
        .then((res: any) => {
          emitChange(res);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const onCropperClick = () => {
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
                emitChange(res);
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
    onBeforeUnmount(() => {
      uploadImage.destroy();
    });
    return {
      onUploadClick,
      loading,
      dialogVisible,
      onCropperClick,
      imageRef,
      onDialogOpened,
      onDialogClosed,
      onConfirmClick,
      croppering,
    };
  },
});
</script>

<style lang="scss" scoped>
.image-process-container {
  .img-button-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  .button-wrapper {
    margin-left: 20px;
    .cropper-button {
      margin: 0;
      margin-top: 5px;
    }
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
  .image-cropper {
    img {
      display: block;
      max-width: 100%;
    }
  }
}
</style>
