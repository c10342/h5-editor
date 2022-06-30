<template>
  <CustomHeader
    @start-save-pic="onStartSaveToPic"
    @end-save-pic="onEndSaveToPic"
  />
  <div class="editor-container">
    <div class="left-panel"><LeftPanel /></div>
    <div class="center-panel">
      <CenterPanel :isSavingToPic="isSavingToPic" />
    </div>
    <div class="right-panel"><RightPanel /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LeftPanel from "@/views/left-panel/index.vue";
import CenterPanel from "@/views/center-panel/index.vue";
import RightPanel from "@/views/right-panel/index.vue";
import initHotKeys from "@/plugins/hot-keys";
import initContextMenu from "@/plugins/context-menu/index";
import saveWork from "@/plugins/save-work";
import CustomHeader from "@/views/header/index.vue";

export default defineComponent({
  name: "App",
  components: { LeftPanel, CenterPanel, RightPanel, CustomHeader },
  setup() {
    initHotKeys();
    initContextMenu();
    saveWork();
    const isSavingToPic = ref(false);
    const onStartSaveToPic = () => {
      isSavingToPic.value = true;
    };
    const onEndSaveToPic = () => {
      isSavingToPic.value = false;
    };
    return { onStartSaveToPic, onEndSaveToPic, isSavingToPic };
  },
});
</script>

<style lang="scss">
.editor-container {
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  .left-panel {
    width: 300px;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }
  .center-panel {
    flex: 1;
    min-height: 100vh;
    background-color: #f0f2f5;
    padding: 20px;
    box-sizing: border-box;
  }
  .right-panel {
    width: 350px;
    height: 100vh;
  }
}
</style>
