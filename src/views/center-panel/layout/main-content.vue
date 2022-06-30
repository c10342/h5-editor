<template>
  <div
    class="preview-list"
    :class="{ active: isPageActive, 'saving-pic': isSavingToPic }"
  >
    <div class="body-container" :style="pageStyle" id="canvas-area">
      <EditorWrapper
        v-for="component in components"
        :key="component.id"
        :id="component.id"
      >
        <component :is="component.name" isEditing v-bind="component.props" />
      </EditorWrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { GlobalDataProps } from "@/types/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import EditorWrapper from "../components/editor-wrapper.vue";

export default defineComponent({
  components: { EditorWrapper },
  props: {
    isSavingToPic: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    // 过滤掉隐藏的组件
    const components = computed(() =>
      store.state.components.filter((component) => !component.isHidden)
    );
    const pageStyle = computed(() => {
      return store.state.page.props;
    });
    const isPageActive = computed(() => {
      return store.state.isPageActive;
    });
    return { components, pageStyle, isPageActive };
  },
});
</script>

<style lang="scss" scoped>
.preview-list {
  padding: 0;
  margin: 0;
  width: 375px;
  height: 80vh;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  // position: relative;
  margin-top: 50px;
  &.saving-pic {
    height: unset;
    overflow: unset;
  }
  &.active {
    border-color: #1890ff;
  }

  .body-container {
    width: 100%;
    position: relative;
    overflow: hidden;
  }
}
</style>
