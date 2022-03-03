<template>
  <el-tabs v-model="activeName" type="card" class="right-panel-container">
    <el-tab-pane label="属性设置" name="first">
      <PropsTable />
    </el-tab-pane>
    <el-tab-pane label="图层设置" name="second">
      <LayerTable />
    </el-tab-pane>
    <el-tab-pane label="页面设置" name="third">
      <PageTable />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PropsTable from "./layout/props-table.vue";
import LayerTable from "./layout/layer-table.vue";
import PageTable from "./layout/page-table.vue";

export default defineComponent({
  components: { PropsTable, LayerTable, PageTable },
  setup() {
    const activeName = ref("first");
    return {
      activeName,
    };
  },
});
</script>

<style lang="scss" scoped>
.right-panel-container {
  :deep(.el-tabs__content) {
    height: calc(100vh - 60px);
    overflow-y: auto;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      background-color: skyblue;
      background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
      );
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #ededed;
      border-radius: 10px;
    }
  }
}
</style>
