<template>
  <component
    :is="tag"
    @click.prevent="handleClick"
    :style="styleProps"
    class="custom-text"
  >
    {{ text }}
  </component>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useStylePick from "@/hooks/use-style-pick";
import useComponentClick from "@/hooks/use-component-click";
import {
  textDefaultProps,
  transformToComponentProps,
  isEditingProp,
} from "@/default-props";
import { without } from "lodash-es";
const extraProps = {
  tag: {
    type: String,
    default: "p",
  },
  ...isEditingProp,
};

const pickStyles = without(
  Object.keys(textDefaultProps),
  "actionType",
  "url",
  "text"
);

export default defineComponent({
  name: "CustomText",
  props: Object.assign(
    {},
    transformToComponentProps(textDefaultProps),
    extraProps
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
h2.custom-text,
p.custom-text {
  margin-bottom: 0;
}
button.custom-text {
  padding: 5px 10px;
  cursor: pointer;
}
.custom-text {
  box-sizing: border-box;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
