<template>
  <div class="editor-container">
    <div class="left-panel"><LeftPanel /></div>
    <div class="center-panel"><CenterPanel /></div>
    <div class="right-panel"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LeftPanel from "@/views/left-panel/index.vue";
import CenterPanel from "@/views/center-panel/index.vue";

export default defineComponent({
  name: "App",
  components: { LeftPanel, CenterPanel },
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
    width: 300px;
    min-height: 100vh;
  }
}
</style>
