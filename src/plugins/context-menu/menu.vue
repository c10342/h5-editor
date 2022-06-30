<template>
  <div class="context-menu-component" ref="menuRef">
    <div
      class="menu-item"
      v-for="(item, index) in actions"
      :key="index"
      @click="onMenuItemClick(item)"
    >
      <span class="item-text">{{ item.text }}</span>
      <span class="item-shortcut">{{ item.shortcut }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import useClickOutside from "@/hooks/use-click-outside";
import { getParentElement } from "@/utils/hepler";
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  PropType,
  ref,
} from "vue";
import { ActionItem } from "./index";

export default defineComponent({
  props: {
    actions: {
      type: Array as PropType<ActionItem[]>,
      default: () => [],
    },
    triggerClass: {
      type: String,
    },
    onSelect: {
      type: Function,
    },
  },
  emits: ["select"],
  setup(props, context) {
    const menuRef = ref<HTMLElement | null>(null);
    let componentId: string | null = null;
    const hideMenu = () => {
      if (menuRef.value) {
        menuRef.value.style.display = "";
      }
    };
    const onMenuItemClick = (data: ActionItem) => {
      if (data.action && componentId !== null) {
        data.action(componentId);
        hideMenu();
      }
    };

    const trigger = (e: MouseEvent) => {
      if (props.triggerClass) {
        const target = e.target as HTMLElement;
        // 点击指定元素才触发
        const parentElement = getParentElement(target, props.triggerClass);
        if (parentElement) {
          e.preventDefault();
          if (menuRef.value) {
            menuRef.value.style.display = "block";
            menuRef.value.style.top = `${e.clientY}px`;
            menuRef.value.style.left = `${e.clientX}px`;
            componentId = parentElement.dataset.componentId as string;
            if (props.onSelect) {
              props.onSelect(componentId);
            }
            return;
          }
        }
      }
      componentId = null;
    };

    useClickOutside(menuRef, hideMenu);

    onMounted(() => {
      document.addEventListener("contextmenu", trigger);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("contextmenu", trigger);
    });

    return {
      onMenuItemClick,
      menuRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.context-menu-component {
  display: none;
  position: absolute;
  background: #fff;
  z-index: 2000;
  width: 220px;
  border: 1px solid rgb(204, 204, 204);
  top: 0;
  left: 0;
  .menu-item {
    height: 40px;
    line-height: 40px;
    margin: 4px 0;
    padding: 0 16px;
    overflow: hidden;
    font-size: 14px;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    .item-shortcut {
      color: #ccc;
    }
    &:hover {
      background: #efefef;
      .item-text {
        color: #3e7fff;
      }
    }
  }
}
</style>
