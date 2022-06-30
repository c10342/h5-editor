export interface ComponentData {
  // 组件数据
  props: { [key: string]: any };
  // 组件id
  id: string;
  //   组件名称，通过动态组件渲染
  name: "custom-text" | "custom-image" | "custom-shape";
  // 图层名称
  layerName: string;
  // 是否隐藏
  isHidden: boolean;
  // 是否锁定
  isLocked: boolean;
}

export interface PageData {
  title: string;
  props: { [key: string]: any };
}

export interface EditProps {
  // 页面所有组件
  components: ComponentData[];
  // 被选中的组件id
  currentElement: string;
}

export interface HistoryProps {
  id: string;
  componentId?: string;
  type: "add" | "delete" | "modify";
  data: any;
  index?: number;
}

export interface GlobalDataProps {
  // 页面所有组件
  components: ComponentData[];
  // 当前选中的组件id
  currentComponentId: string;
  // 页面数据
  page: PageData;
  // 被复制的组件
  copiedComponent: ComponentData | null;
  // 当前操作的历史记录
  histories: HistoryProps[];
  // 当前历史记录的操作位置
  historyIndex: number;
  // 防抖，一开始的值
  cacheOldValue: any;
  // 最大历史条目
  maxHistoryNumber: number;
  // 是否选中页面
  isPageActive: boolean;
  // 画布是否发生了修改
  isDirty: boolean;
  // 是否正在保存
  isSaving: boolean;
}

export type MoveDirection = "Up" | "Down" | "Left" | "Right";

export interface UpdateComponentData {
  key: string | string[];
  value: string | string[];
  id: string;
  isRoot: boolean;
}
