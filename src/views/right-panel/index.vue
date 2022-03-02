<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="属性设置" name="first">
      <PropsTable />
    </el-tab-pane>
    <el-tab-pane label="图层设置" name="second">
      <LayerTable />
    </el-tab-pane>
    <el-tab-pane label="页面设置" name="third">Role</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PropsTable from "./layout/props-table.vue";
import LayerTable from "./layout/layer-table.vue";

export default defineComponent({
  components: { PropsTable, LayerTable },
  setup(props, context) {
    const activeName = ref("first");
    return {
      activeName,
    };
  },
});
</script>

<style></style>
