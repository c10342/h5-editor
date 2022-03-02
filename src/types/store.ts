export interface ComponentData {
  // 组件数据
  props: { [key: string]: any };
  // 组件id
  id: string;
  //   组件名称，通过动态组件渲染
  name: "custom-text" | "custom-image" | "custom-shape";
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
