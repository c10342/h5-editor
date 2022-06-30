<template>
  <div
    class="editor-wrapper"
    :class="{ active: isActive }"
    :style="wrapperStyle"
    :data-component-id="componentItem.id"
    @mousedown="onMouseDown"
    @click="onItemClick"
    ref="wrapperRef"
  >
    <slot />
    <div class="resizer-wrapper" v-if="isActive">
      <div
        class="resizer top-left"
        @mousedown.stop="onResize($event, 'top-left')"
      ></div>
      <div
        class="resizer top-right"
        @mousedown.stop="onResize($event, 'top-right')"
      ></div>
      <div
        class="resizer bottom-left"
        @mousedown.stop="onResize($event, 'bottom-left')"
      ></div>
      <div
        class="resizer bottom-right"
        @mousedown.stop="onResize($event, 'bottom-right')"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { ComponentData, GlobalDataProps } from "@/types/store";
import { pick, forEach } from "lodash-es";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import useMouseMove from "../hooks/use-mouse-move";
type ResizeDirection =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export default defineComponent({
  props: {
    id: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    const store = useStore<GlobalDataProps>();
    // 设置选中的组件
    const onItemClick = () => {
      store.commit("setActive", props.id);
    };
    // 当前选中组件
    const activeComponent = computed<ComponentData | null>(
      () => store.getters.currentComponent
    );
    // 是否选中状态
    const isActive = computed(() => {
      return activeComponent.value && activeComponent.value.id === props.id;
    });
    const componentItem = computed(() => {
      return store.state.components.find((comp) => comp.id === props.id);
    });
    // 当前容器的样式，从组件的props属性中筛选出来
    const wrapperStyle = computed(() => {
      const componentProps = componentItem.value?.props ?? {};
      return pick(componentProps, [
        "position",
        "top",
        "left",
        "width",
        "height",
      ]);
    });
    const wrapperRef = ref<HTMLElement | null>(null);

    const updateComponent = (options: { [key: string]: number }) => {
      const keys = Object.keys(options);
      const values = Object.values(options).map((v) => `${v}px`);
      // 批量修改数据
      store.commit("updateComponent", {
        id: props.id,
        key: keys,
        value: values,
      });
    };

    const getMouseDownInfo = (event: MouseEvent) => {
      const canvasArea = document.querySelector("#canvas-area") as HTMLElement;
      const outsideWrapperRect = canvasArea.getBoundingClientRect();
      const wrapperRect = wrapperRef.value!.getBoundingClientRect();
      const offsetX = event.clientX - wrapperRect.left;
      const offsetY = event.clientY - wrapperRect.top;
      return {
        outsideWrapperRect,
        wrapperRect,
        offsetX,
        offsetY,
      };
    };

    const onMouseDown = (event: MouseEvent) => {
      const { outsideWrapperRect, offsetX, offsetY } = getMouseDownInfo(event);
      let translateY = 0;
      let translateX = 0;
      let isMoving = false;
      useMouseMove(
        (e: MouseEvent) => {
          isMoving = true;
          const x = e.clientX - outsideWrapperRect.left;
          const y = e.clientY - outsideWrapperRect.top;
          translateX = x - offsetX;
          translateY = y - offsetY;
          wrapperRef.value!.style.top = `${translateY}px`;
          wrapperRef.value!.style.left = `${translateX}px`;
        },
        () => {
          if (isMoving) {
            updateComponent({
              left: translateX,
              top: translateY,
            });
            isMoving = false;
          }
        }
      );
    };

    const getWidthAndHeight = (
      e: MouseEvent,
      rect: DOMRect,
      direction: ResizeDirection
    ) => {
      switch (direction) {
        case "bottom-right":
          return {
            width: e.clientX - rect.left,
            height: e.clientY - rect.top,
          };
        case "bottom-left":
          return {
            width: rect.right - e.clientX,
            height: e.clientY - rect.top,
          };
        case "top-right":
          return {
            width: e.clientX - rect.left,
            height: rect.bottom - e.clientY,
          };
        case "top-left":
          return {
            width: rect.right - e.clientX,
            height: rect.bottom - e.clientY,
          };
      }
    };

    const getTopAndLeft = (
      e: MouseEvent,
      rect: DOMRect,
      offsetX: number,
      direction: ResizeDirection
    ): { [key: string]: number } => {
      switch (direction) {
        case "bottom-right":
          return {};
        case "bottom-left":
          return {
            left: e.clientX - rect.left - offsetX,
          };
        case "top-right":
          return {
            top: e.clientY - rect.top,
          };
        case "top-left":
          return {
            top: e.clientY - rect.top,
            left: e.clientX - rect.left - offsetX,
          };
      }
    };

    const onResize = (event: MouseEvent, direction: ResizeDirection) => {
      const { outsideWrapperRect, offsetX, wrapperRect } =
        getMouseDownInfo(event);
      let obj = {};
      let isMoving = false;
      useMouseMove(
        (e: MouseEvent) => {
          isMoving = true;

          obj = {
            ...getWidthAndHeight(e, wrapperRect, direction),
            ...getTopAndLeft(e, outsideWrapperRect, offsetX, direction),
          };
          forEach(obj, (value, key) => {
            wrapperRef.value!.style[key as any] = value + "px";
          });
        },
        () => {
          if (isMoving) {
            updateComponent(obj);
            isMoving = false;
          }
        }
      );
    };

    return {
      onItemClick,
      isActive,
      wrapperStyle,
      onMouseDown,
      wrapperRef,
      onResize,
      componentItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor-wrapper {
  padding: 0px;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
  &:hover {
    border: 1px dashed #ccc;
  }
  &.active {
    border: 1px solid #1890ff;
    user-select: none;
    z-index: 1500;
  }

  :deep(.custom-text) {
    position: static !important;
    width: 100% !important;
    height: 100% !important;
  }
  :deep(.custom-shape) {
    position: static !important;
    width: 100% !important;
    height: 100% !important;
  }
  :deep(.custom-image) {
    position: static !important;
    width: 100% !important;
    height: 100% !important;
  }
  .resizer-wrapper {
    .resizer {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: white;
      border: 3px solid #1890ff;
      position: absolute;
      display: block;
    }
    .top-left {
      left: -5px;
      top: -5px;
      cursor: nwse-resize;
    }
    .top-right {
      right: -5px;
      top: -5px;
      cursor: nesw-resize;
    }
    .bottom-left {
      left: -5px;
      bottom: -5px;
      cursor: nesw-resize;
    }
    .bottom-right {
      right: -5px;
      bottom: -5px;
      cursor: nwse-resize;
    }
  }
}
</style>
