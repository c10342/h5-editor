<template>
  <img
    :src="imageSrc"
    :style="styleProps"
    @click.prevent="handleClick"
    class="custom-image"
    :draggable="false"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useStylePick from "@/hooks/use-style-pick";
import useComponentClick from "@/hooks/use-component-click";
import {
  transformToComponentProps,
  isEditingProp,
  imageDefaultProps,
} from "@/default-props";
import { without } from "lodash-es";

const pickStyles = without(Object.keys(imageDefaultProps), "imageSrc");

export default defineComponent({
  name: "CustomImage",
  props: Object.assign(
    {},
    transformToComponentProps(imageDefaultProps),
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

<style scoped>
.custom-image {
  max-width: 100%;
}
</style>
