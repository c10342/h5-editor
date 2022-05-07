<template>
  <div @click.stop="onClick" ref="wrapperRef">
    <el-input
      v-if="isEditing"
      placeholder="文本不能为空"
      v-model="inputValue"
      ref="inputRef"
      :maxlength="maxlength"
    />
    <slot v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from "vue";
import useKeyPress from "@/hooks/use-key-press";
import useClickOutside from "@/hooks/use-click-outside";

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
    maxlength: {
      type: [String, Number],
      default: 50,
    },
  },
  emits: ["change"],
  setup(props, context) {
    const inputValue = ref(props.value);
    const isEditing = ref(false);
    const inputRef = ref<null | HTMLInputElement>(null);
    const wrapperRef = ref<null | HTMLInputElement>(null);
    useKeyPress("Enter", () => {
      if (isEditing.value) {
        isEditing.value = false;
        context.emit("change", inputValue.value);
      }
    });
    useKeyPress("Escape", () => {
      if (isEditing.value) {
        isEditing.value = false;
      }
    });
    useClickOutside(wrapperRef, () => {
      if (isEditing.value) {
        isEditing.value = false;
        context.emit("change", inputValue.value);
      }
    });
    const onClick = async () => {
      isEditing.value = true;
      inputValue.value = props.value;
      await nextTick();
      if (inputRef.value) {
        inputRef.value.focus();
      }
    };
    return {
      inputValue,
      isEditing,
      onClick,
      inputRef,
      wrapperRef,
    };
  },
});
</script>
