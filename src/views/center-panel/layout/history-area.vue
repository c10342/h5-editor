<template>
  <div class="history-area">
    <el-tooltip effect="dark" content="快捷键提示" placement="bottom">
      <el-button
        icon="question-filled"
        circle
        @click="dialogVisible = true"
      ></el-button>
    </el-tooltip>
    <el-tooltip effect="dark" content="撤销" placement="bottom">
      <el-button
        :disabled="isUndoDisabled"
        icon="arrow-left"
        circle
        @click="onUndo"
      ></el-button>
    </el-tooltip>
    <el-tooltip effect="dark" content="恢复" placement="bottom">
      <el-button
        :disabled="isRedoDisabled"
        icon="arrow-right"
        circle
        @click="onRedo"
      ></el-button>
    </el-tooltip>
  </div>

  <el-dialog v-model="dialogVisible" title="快捷键操作" width="400px">
    <ul class="shortcut-list">
      <li
        v-for="(item, key) in operationList"
        :key="key"
        class="shortcut-list-item"
      >
        <span class="text">{{ item.text }}</span>
        <span class="bold">{{ item.shortcut }}</span>
      </li>
    </ul>
  </el-dialog>
</template>

<script lang="ts">
import { GlobalDataProps } from "@/types/store";
import { computed, defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import ComponentOperations from "@/plugins/operations";
const operationText = {
  copy: {
    text: "拷贝图层",
    shortcut: "Ctrl+C",
  },
  paste: {
    text: "粘贴图层",
    shortcut: "Ctrl+V",
  },
  delete: {
    text: "删除图层",
    shortcut: "Backspace / Delete",
  },
  cancel: {
    text: "取消选中",
    shortcut: "ESC",
  },
  undo: {
    text: "撤销",
    shortcut: "Ctrl+Z",
  },
  redo: {
    text: "重做",
    shortcut: "Ctrl+Y",
  },
  move: {
    text: "上下左右移动一像素",
    shortcut: "↑ ↓ → ←",
  },
  moveTen: {
    text: "上下左右移动十像素",
    shortcut: "Shift + ↑ ↓ → ←",
  },
};

export default defineComponent({
  setup() {
    const store = useStore<GlobalDataProps>();
    const operations = new ComponentOperations();
    const dialogVisible = ref(false);
    const operationList = reactive(operationText);
    const isUndoDisabled = computed(() => {
      return store.getters.isUndoDisabled;
    });
    const isRedoDisabled = computed(() => {
      return store.getters.isRedoDisabled;
    });
    const onUndo = () => {
      operations.undo();
    };
    const onRedo = () => {
      operations.redo();
    };
    return {
      dialogVisible,
      operationList,
      onUndo,
      isUndoDisabled,
      onRedo,
      isRedoDisabled,
    };
  },
});
</script>

<style lang="scss" scoped>
.history-area {
  position: absolute;
  right: 0;
}

.shortcut-list {
  list-style-type: none;
  padding: 0;
  width: 300px;
  margin: 0 auto;
  .shortcut-list-item {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .text {
      color: rgba(0, 0, 0, 0.45);
    }
    .bold {
      color: #1890ff;
    }
  }
}
</style>
