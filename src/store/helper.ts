import { v4 as uuidv4 } from "uuid";

import {
  GlobalDataProps,
  HistoryProps,
  UpdateComponentData,
} from "@/types/store";
import { debounce, isArray, isNumber, isString } from "lodash-es";

export const pushHistory = (
  state: GlobalDataProps,
  historyRecord: HistoryProps
) => {
  // 已经撤销过
  if (state.historyIndex !== -1) {
    state.histories = state.histories.slice(0, state.historyIndex);
    state.historyIndex = -1;
  }
  if (state.histories.length < state.maxHistoryNumber) {
    // 还没超出
    state.histories.push(historyRecord);
  } else {
    // 超出
    // 删除第一项
    state.histories.shift();
    state.histories.push(historyRecord);
  }
};

const pushModifyHistory = (
  state: GlobalDataProps,
  { id, value, key }: UpdateComponentData
) => {
  pushHistory(state, {
    id: uuidv4(),
    componentId: id,
    type: "modify",
    data: {
      oldVal: state.cacheOldValue,
      newVal: value,
      key,
    },
  });
  state.cacheOldValue = null;
};

export const pushModifyHistoryDebounce = debounce(pushModifyHistory, 500);

export const modifyHistory = (
  state: GlobalDataProps,
  history: HistoryProps,
  type: "undo" | "redo"
) => {
  const { componentId, data } = history;
  const { key, oldVal, newVal } = data;
  const value = type === "undo" ? oldVal : newVal;
  const updateComponent = state.components.find(
    (component) => component.id === componentId
  );
  if (updateComponent) {
    if (isArray(key) && isArray(value)) {
      key.forEach((k, i) => {
        updateComponent.props[k] = value[i];
      });
    } else if (isString(key) && (isString(value) || isNumber(value))) {
      updateComponent.props[key] = value;
    }
  }
};

export function setDirtyWrapper(
  callback: (state: GlobalDataProps, playload: any) => any
) {
  return (state: GlobalDataProps, playload: any) => {
    state.isDirty = true;
    callback(state, playload);
  };
}
