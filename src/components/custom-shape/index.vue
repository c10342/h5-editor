<template>
  <div
    @click.prevent="handleClick"
    :style="styleProps"
    class="custom-shape"
    :draggable="false"
  ></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useStylePick from "@/hooks/use-style-pick";
import useComponentClick from "@/hooks/use-component-click";
import {
  transformToComponentProps,
  isEditingProp,
  shapeDefaultProps,
} from "@/default-props";
import { without } from "lodash-es";

const pickStyles = without(Object.keys(shapeDefaultProps));

export default defineComponent({
  name: "CustomShape",
  props: Object.assign(
    {},
    transformToComponentProps(shapeDefaultProps),
    isEditingProp
  ),
  setup(props) {
    const styleProps = useStylePick(props, pickStyles);
    const handleClick = useComponentClick(props);

    return {
      styleProps,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.custom-shape {
  box-sizing: border-box;
}
</style>
