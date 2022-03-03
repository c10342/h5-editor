<template>
  <div class="preview-list">
    <div class="body-container" :style="pageStyle">
      <EditorWrapper
        v-for="component in components"
        :key="component.id"
        :id="component.id"
      >
        <component :is="component.name" v-bind="component.props" />
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
  setup() {
    const store = useStore<GlobalDataProps>();
    // 过滤掉隐藏的组件
    const components = computed(() =>
      store.state.components.filter((component) => !component.isHidden)
    );
    const pageStyle = computed(() => {
      return store.state.page.props;
    });
    return { components, pageStyle };
  },
});
</script>

<style lang="scss" scoped>
.preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;

  .body-container {
    width: 100%;
  }
}
</style>
