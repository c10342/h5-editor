<template>
  <div
    v-for="(item, index) in defaultTextTemplate"
    :key="index"
    @click="onTextClick(item)"
    class="text-item-wrapper"
  >
    <CustomText v-bind="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { defaultTextTemplate } from "@/default-templates";
import { TextDefaultProps } from "@/types/default-props";
import { ComponentData, GlobalDataProps } from "@/types/store";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "vuex";

export default defineComponent({
  setup(props, context) {
    const store = useStore<GlobalDataProps>();
    const onTextClick = (data: TextDefaultProps) => {
      const newComponent: ComponentData = {
        id: uuidv4(),
        name: "custom-text",
        props: data,
      };
      store.commit("addComponent", newComponent);
    };
    return {
      defaultTextTemplate,
      onTextClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.text-item-wrapper {
  margin-bottom: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  :deep(.custom-text) {
    position: relative !important;
    width: auto !important;
  }
}
</style>
