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

export interface EditProps {
  // 页面所有组件
  components: ComponentData[];
  // 被选中的组件id
  currentElement: string;
}

export interface GlobalDataProps {
  components: ComponentData[];
  currentComponentId: string;
}
