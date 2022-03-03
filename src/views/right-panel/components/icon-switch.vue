<template>
  <el-button :type="checked ? 'primary' : ''" @click="handleClick">
    {{ text }}
  </el-button>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
    },
  },
  emits: ["change"],
  setup(props, context) {
    const handleClick = () => {
      context.emit("change", !props.checked);
    };
    return {
      handleClick,
    };
  },
});
</script>
