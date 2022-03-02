<template>
  <div class="layer-table-container">
    <div
      v-for="(layer, index) in layerList"
      :key="index"
      class="layer-item"
      :class="{ active: currentComponentId === layer.id }"
      @click="onLayerClick(layer.id)"
    >
      <el-tooltip :content="layer.isHidden ? '显示' : '隐藏'" placement="top">
        <el-button
          circle
          @click="handleChange(layer.id, 'isHidden', !layer.isHidden)"
        >
          <template v-slot:icon v-if="layer.isHidden"><VideoPlay /> </template>
          <template v-slot:icon v-else><VideoPause /> </template>
        </el-button>
      </el-tooltip>
      <el-tooltip :content="layer.isLocked ? '解锁' : '锁定'" placement="top">
        <el-button
          circle
          @click="handleChange(layer.id, 'isLocked', !layer.isLocked)"
        >
          <template v-slot:icon v-if="layer.isLocked"><Lock /> </template>
          <template v-slot:icon v-else><Unlock /> </template>
        </el-button>
      </el-tooltip>
      <span class="layerName">{{ layer.layerName }}</span>
      <el-tooltip content="拖动排序" placement="top">
        <el-button circle class="move">
          <template v-slot:icon><Ship /> </template
        ></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { GlobalDataProps } from "@/types/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup(props, context) {
    const store = useStore<GlobalDataProps>();
    const layerList = computed(() => {
      return store.state.components;
    });
    const handleChange = (id: string, key: string, value: boolean) => {
      store.commit("updateComponent", { id, key, value, isRoot: true });
    };
    const onLayerClick = (id: string) => {
      store.commit("setActive", id);
    };
    const currentComponentId = computed(() => {
      return store.state.currentComponentId;
    });
    return {
      layerList,
      handleChange,
      onLayerClick,
      currentComponentId,
    };
  },
});
</script>

<style lang="scss" scoped>
.layer-table-container {
  .layer-item {
    padding: 10px 15px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid #fff;
    border-bottom-color: #f0f0f0;
    &:nth-child(1) {
      border-top-color: #f0f0f0;
    }
    &:hover {
      background: #e6f7ff;
    }
    &.active {
      border: 1px solid #1890ff;
    }
    .move {
      margin-left: auto;
      cursor: move;
    }
    .layerName {
      flex: 1;
      margin: 0 10px;
    }
  }
}
</style>
