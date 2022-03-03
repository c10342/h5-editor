<template>
  <div class="layer-table-container" @dragend="onDragEnd">
    <div
      class="layer-item"
      v-for="(layer, index) in layerList"
      :key="layer.id"
      :class="{
        active: currentComponentId === layer.id,
        ghost: currentDragId === layer.id,
      }"
      :data-index="index"
      draggable="true"
      @click="onLayerClick(layer.id)"
      @dragstart="onDragStart(layer.id, index)"
      @dragenter="onDragEnter(index)"
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
      <InputEdit
        class="input-edit"
        :value="layer.layerName"
        @change="onInputEditChange(layer.id, $event)"
      >
        <span>{{ layer.layerName }}</span>
      </InputEdit>
      <!-- <el-tooltip content="拖动排序" placement="top">
        <el-button circle class="move">
          <template v-slot:icon><Ship /> </template
        ></el-button>
      </el-tooltip> -->
    </div>
  </div>
</template>

<script lang="ts">
import { GlobalDataProps } from "@/types/store";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import InputEdit from "../components/input-edit.vue";

export default defineComponent({
  components: { InputEdit },
  setup() {
    const store = useStore<GlobalDataProps>();
    let currentDragIndex: number | string = "";
    let isDragging = false;
    const currentDragId = ref("");
    const layerList = computed(() => {
      return store.state.components;
    });
    const onDragStart = (id: string, index: number) => {
      isDragging = true;
      currentDragId.value = id;
      currentDragIndex = index;
    };
    const onDragEnd = () => {
      currentDragId.value = "";
      currentDragIndex = "";
      isDragging = false;
    };
    const onDragEnter = (index: number) => {
      if (!isDragging || !currentDragIndex) {
        return;
      }
      store.commit("swapComponent", {
        index1: index,
        index2: currentDragIndex,
      });
      currentDragIndex = index;
    };
    const handleChange = (id: string, key: string, value: boolean | string) => {
      store.commit("updateComponent", { id, key, value, isRoot: true });
    };
    const onLayerClick = (id: string) => {
      store.commit("setActive", id);
    };
    const currentComponentId = computed(() => {
      return store.state.currentComponentId;
    });
    const onInputEditChange = (id: string, data: string) => {
      handleChange(id, "layerName", data);
    };
    return {
      layerList,
      handleChange,
      onLayerClick,
      currentComponentId,
      onInputEditChange,
      onDragStart,
      currentDragId,
      onDragEnd,
      onDragEnter,
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
    &.ghost {
      opacity: 0.5;
    }
    .move {
      margin-left: auto;
      cursor: move;
    }
    .input-edit {
      margin-left: 10px;
    }
  }
}
</style>
