import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
import {
  ComponentData,
  GlobalDataProps,
  MoveDirection,
  UpdateComponentData,
} from "@/types/store";
import { textDefaultProps } from "@/default-props";
import { showSuccessMessage, showWarningMessage } from "@/utils/message";
import { cloneDeep, isArray, isNumber, isString } from "lodash-es";
import {
  modifyHistory,
  pushHistory,
  pushModifyHistoryDebounce,
  setDirtyWrapper,
} from "./helper";

const componentsList: ComponentData[] = [
  {
    props: {
      ...textDefaultProps,
      text: "hello1",
      fontSize: "20px",
      color: "#fe4321",
      lineHeight: "1",
      textAlign: "left",
      fontFamily: '"SimSun","STSong"',
    },
    name: "custom-text",
    id: uuidv4(),
    layerName: "图层1",
    isLocked: false,
    isHidden: false,
  },
];

const defaultPageProps = {
  backgroundColor: "#ffffff",
  backgroundImage: "",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "560px",
};

export default createStore<GlobalDataProps>({
  state: {
    components: componentsList,
    currentComponentId: "",
    page: {
      title: "test",
      props: defaultPageProps,
    },
    copiedComponent: null,
    // 历史记录，增删改
    histories: [],
    historyIndex: -1,
    cacheOldValue: null,
    maxHistoryNumber: 10,
    isPageActive: false,
    isDirty: false,
    isSaving: false,
  },
  getters: {
    currentComponent(state) {
      return state.components.find(
        (component) => component.id === state.currentComponentId
      );
    },
    isUndoDisabled(state) {
      return state.histories.length === 0 || state.historyIndex === 0;
    },
    isRedoDisabled(state) {
      return (
        state.histories.length === 0 ||
        state.historyIndex === -1 ||
        state.historyIndex === state.histories.length
      );
    },
  },
  mutations: {
    // 添加画布组件
    addComponent: setDirtyWrapper((state, componentData: ComponentData) => {
      state.components.push(componentData);

      pushHistory(state, {
        id: uuidv4(),
        componentId: componentData.id,
        type: "add",
        data: cloneDeep(componentData),
      });
    }),
    // 设置选中组件的id
    setActive(state, currentId: string) {
      state.currentComponentId = currentId;
      state.isPageActive = false;
    },
    // 设置页面为选中状态
    setPageActive(state) {
      state.currentComponentId = "";
      state.isPageActive = true;
    },
    // 更新组件的值
    updateComponent: setDirtyWrapper(
      (state, { key, value, id, isRoot }: UpdateComponentData) => {
        const searchId = id || state.currentComponentId;
        // 有id就根据id进行查询
        const currentComponent = state.components.find(
          (component) => component.id === searchId
        );
        if (currentComponent) {
          if (isRoot) {
            // 修改的是第一层元素
            (currentComponent as any)[key as string] = value;
          } else {
            if (!state.cacheOldValue) {
              // 记录最开始的值
              state.cacheOldValue = isArray(key)
                ? key.map((k) => currentComponent.props[k])
                : currentComponent.props[key];
            }
            if (isArray(key) && isArray(value)) {
              key.forEach((k, i) => {
                currentComponent.props[k] = value[i];
              });
            } else if (isString(key) && (isString(value) || isNumber(value))) {
              currentComponent.props[key] = value;
            }
            pushModifyHistoryDebounce(state, {
              key,
              value,
              id: searchId,
              isRoot,
            });
          }
        }
      }
    ),
    swapComponent(state, { index1, index2 }) {
      const temp = state.components[index1];
      state.components[index1] = state.components[index2];
      state.components[index2] = temp;
    },
    // 更新页面值
    updatePage: setDirtyWrapper((state, { key, value }) => {
      if (key === "title") {
        state.page.title = value;
      } else {
        state.page.props[key] = value;
      }
    }),
    // 复制组件
    copyComponent(state, id) {
      const currentComponent = state.components.find(
        (component) => component.id === id
      );
      if (currentComponent) {
        state.copiedComponent = currentComponent;
        showSuccessMessage("图层拷贝成功");
      }
    },
    // 粘贴组件
    pasteComponent(state) {
      const copiedComponent = state.copiedComponent;
      if (copiedComponent) {
        const cloneComponent = cloneDeep(copiedComponent);
        cloneComponent.id = uuidv4();
        cloneComponent.layerName = `${cloneComponent.layerName}-副本`;
        const store = this as any;
        store.commit("addComponent", cloneComponent);
        showSuccessMessage("图层粘贴成功");
      } else {
        showWarningMessage("请先拷贝图层");
      }
    },
    // 删除组件
    deleteComponent: setDirtyWrapper((state, id) => {
      const index = state.components.findIndex(
        (component) => component.id === id
      );
      if (index > -1) {
        pushHistory(state, {
          id: uuidv4(),
          componentId: id,
          type: "delete",
          data: state.components[index],
          index,
        });
        state.components.splice(index, 1);
        state.currentComponentId = "";
        showSuccessMessage("删除当前图层成功");
      }
    }),
    moveComponent(
      state,
      { step, direction }: { step: number; direction: MoveDirection }
    ) {
      const currentComponent = state.components.find(
        (component) => component.id === state.currentComponentId
      );
      if (currentComponent) {
        const oldTop = parseInt(currentComponent.props.top || "0");
        const oldLeft = parseInt(currentComponent.props.left || "0");
        const store = this as any;
        switch (direction) {
          case "Up": {
            const newValue = `${oldTop - step}px`;
            store.commit("updateComponent", {
              key: "top",
              value: newValue,
            });
            break;
          }
          case "Down": {
            const newValue = `${oldTop + step}px`;
            store.commit("updateComponent", {
              key: "top",
              value: newValue,
            });
            break;
          }
          case "Left": {
            const newValue = `${oldLeft - step}px`;
            store.commit("updateComponent", {
              key: "left",
              value: newValue,
            });
            break;
          }
          case "Right": {
            const newValue = `${oldLeft + step}px`;
            store.commit("updateComponent", {
              key: "left",
              value: newValue,
            });
            break;
          }
          default:
            break;
        }
      }
    },
    // 撤销操作
    undo: setDirtyWrapper((state) => {
      if (state.historyIndex === 0) {
        // 已经在数组第一位，说明不能再进行撤销了
        return;
      }
      if (state.historyIndex === -1) {
        // 从来没有撤销过，直接获取最后一次操作记录
        state.historyIndex = state.histories.length - 1;
      } else {
        state.historyIndex--;
      }

      // 获取历史记录
      const history = state.histories[state.historyIndex];
      if (!history) {
        return;
      }
      switch (history.type) {
        case "add":
          // 删除元素
          state.components = state.components.filter(
            (component) => component.id !== history.componentId
          );
          break;
        case "delete":
          // 添加元素
          state.components.splice(history.index!, 0, history.data);
          break;
        case "modify": {
          modifyHistory(state, history, "undo");
          break;
        }

        default:
          break;
      }
    }),
    // 恢复操作
    redo: setDirtyWrapper((state) => {
      // 有了撤销操作才能有恢复
      if (state.historyIndex === -1) {
        return;
      }
      const history = state.histories[state.historyIndex];
      if (!history) {
        return;
      }
      switch (history.type) {
        case "add":
          state.components.push(history.data);
          break;
        case "delete":
          state.components = state.components.filter(
            (component) => component.id !== history.componentId
          );
          break;
        case "modify": {
          modifyHistory(state, history, "redo");
          break;
        }

        default:
          break;
      }
      state.historyIndex++;
    }),
    setDirty(state, value: boolean) {
      state.isDirty = value;
    },
    setSaving(state, value: boolean) {
      state.isSaving = value;
    },
  },
  actions: {
    saveWork(store) {
      return new Promise((resolve) => {
        store.commit("setSaving", true);
        setTimeout(() => {
          store.commit("setDirty", false);
          store.commit("setSaving", false);
          resolve(true);
        }, 3000);
      });
    },
  },
  modules: {},
});
