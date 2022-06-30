<template>
  <div class="header">
    <InputEdit :value="pageTitle" @change="onInputEditChange">
      <span class="page-title">{{ pageTitle || "未命名" }}</span>
    </InputEdit>
    <div>
      <el-button type="primary" round>预览</el-button>
      <el-button type="primary" round :loading="isSaving">保存</el-button>
      <el-button
        type="primary"
        round
        @click="onSaveToPic"
        :loading="isSavingToPic"
      >
        保存为图片
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from "vue";
import InputEdit from "@/views/right-panel/components/input-edit.vue";
import { GlobalDataProps } from "@/types/store";
import { useStore } from "vuex";
import html2canvas from "html2canvas";
import { downLoadFile } from "@/utils/hepler";

export default defineComponent({
  components: { InputEdit },
  emits: ["start-save-pic", "end-save-pic"],
  setup(props, context) {
    const store = useStore<GlobalDataProps>();
    const pageTitle = computed(() => {
      return store.state.page.title;
    });
    const onInputEditChange = (title: string) => {
      store.commit("updatePage", { key: "title", value: title });
    };
    const isSaving = computed(() => store.state.isSaving);
    const isSavingToPic = ref(false);
    const onSaveToPic = async () => {
      isSavingToPic.value = true;
      store.commit("setActive", "");
      context.emit("start-save-pic");
      await nextTick();
      const element = document.querySelector(".preview-list") as HTMLElement;
      html2canvas(element, {
        width: element.scrollWidth,
        height: element.scrollHeight,
        useCORS: true,
      }).then(function (canvas) {
        downLoadFile(canvas.toDataURL(), `${pageTitle.value || "未命名"}.png`);
        isSavingToPic.value = false;
        context.emit("end-save-pic");
      });
    };
    return {
      pageTitle,
      onInputEditChange,
      isSaving,
      onSaveToPic,
      isSavingToPic,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  height: 64px;
  padding: 0 50px;
  line-height: 64px;
  background: #001529;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .page-title {
    color: #fff;
    cursor: pointer;
  }
}
</style>
