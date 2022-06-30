import { createVNode, onMounted, onBeforeUnmount, render } from "vue";
import ComponentOperations from "../operations";
import MenuTemplate from "./menu.vue";

export interface ActionItem {
  action: (cid?: string) => void;
  text: string;
  shortcut: string;
}

const initContextMenu = () => {
  let container: null | HTMLElement;
  onMounted(() => {
    const operations = new ComponentOperations();
    const options = {
      actions: [
        {
          action(componentId: string) {
            operations.copy(componentId);
          },
          text: "拷贝图层",
          shortcut: "ctrl+c",
        },
        {
          action() {
            operations.paste();
          },
          text: "粘贴图层",
          shortcut: "ctrl+v",
        },
        {
          action(componentId: string) {
            operations.delete(componentId);
          },
          text: "删除图层",
          shortcut: "backspace, delete",
        },
        {
          action() {
            operations.setActive("");
          },
          text: "取消选中",
          shortcut: "esc",
        },
      ],
      triggerClass: "editor-wrapper",
      onSelect(componentId: string) {
        operations.setActive(componentId);
      },
    };
    container = document.createElement("div");
    const vm = createVNode(MenuTemplate, options);
    render(vm, container);
    document.body.appendChild(container);
  });

  onBeforeUnmount(() => {
    if (container) {
      render(null, container);
      document.body.removeChild(container);
    }
  });
};

export default initContextMenu;
