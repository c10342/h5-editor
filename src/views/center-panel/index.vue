<template>
  <div class="center-panel-container">
    <p>画布区域</p>
    <HistoryArea />
    <MainContent :isSavingToPic="isSavingToPic" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainContent from "./layout/main-content.vue";
import HistoryArea from "./layout/history-area.vue";

export default defineComponent({
  components: { MainContent, HistoryArea },
  props: {
    isSavingToPic: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.center-panel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
</style>
