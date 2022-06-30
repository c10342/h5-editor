<template>
  <div
    v-for="(item, index) in defaultShapePropsList"
    :key="index"
    @click="onShapeClick(item)"
    class="shape-item-wrapper"
  >
    <CustomShape v-bind="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { defaultShapePropsList } from "@/default-templates";
import { TextDefaultProps } from "@/types/default-props";
import { ComponentData, GlobalDataProps } from "@/types/store";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore<GlobalDataProps>();
    const onShapeClick = (data: TextDefaultProps) => {
      const newComponent: ComponentData = {
        id: uuidv4(),
        name: "custom-shape",
        props: data,
        isHidden: false,
        isLocked: false,
        layerName: `图层${store.state.components.length + 1}`,
      };

      store.commit("addComponent", newComponent);
    };
    return {
      defaultShapePropsList,
      onShapeClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.shape-item-wrapper {
  margin-bottom: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  :deep(.custom-shape) {
    position: relative !important;
  }
}
</style>
