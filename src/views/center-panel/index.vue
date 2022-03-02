<template>
  <div class="center-panel-container">
    <p>画布区域</p>
    <MainContent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainContent from "./main-content.vue";

export default defineComponent({
  components: { MainContent },
  setup(props, context) {
    // todo
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
