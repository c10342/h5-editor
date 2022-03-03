<template>
  <el-tabs v-model="activeName" class="left-panel-tabs">
    <el-tab-pane label="文本" name="text">
      <template #label>
        <span class="label-wrapper">
          <el-icon><Document /></el-icon>文本
        </span>
      </template>
      <TextList />
    </el-tab-pane>
    <el-tab-pane label="图片" name="image">
      <template #label>
        <span class="label-wrapper">
          <el-icon><Picture /></el-icon>图片
        </span>
      </template>
      <ImageList />
    </el-tab-pane>
    <el-tab-pane label="形状" name="shape">
      <template #label>
        <span class="label-wrapper">
          <el-icon><Burger /></el-icon>形状
        </span>
      </template>

      形状
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TextList from "./layout/text-list.vue";
import ImageList from "./layout/image-list.vue";

export default defineComponent({
  components: { TextList, ImageList },
  setup() {
    const activeName = ref("text");
    return {
      activeName,
    };
  },
});
</script>

<style lang="scss" scoped>
.left-panel-tabs {
  .label-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    :deep(.el-icon) {
      margin-right: 5px;
    }
  }
}
</style>
