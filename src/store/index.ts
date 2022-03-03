import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { ComponentData, GlobalDataProps } from "@/types/store";

const componentsList: ComponentData[] = [
  {
    props: {
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
  {
    props: {
      text: "hello2",
      fontSize: "10px",
    },
    name: "custom-text",
    id: uuidv4(),
    layerName: "图层2",
    isLocked: false,
    isHidden: false,
  },
  {
    props: { text: "hello3", fontSize: "15px" },
    name: "custom-text",
    id: uuidv4(),
    layerName: "图层3",
    isLocked: false,
    isHidden: false,
  },
  {
    props: { imageSrc: "https://static.imooc-lego.com/imooc-test/YqyK_Y.png" },
    name: "custom-image",
    id: uuidv4(),
    layerName: "图层4",
    isLocked: false,
    isHidden: false,
  },
];

export default createStore<GlobalDataProps>({
  state: {
    components: componentsList,
    currentComponentId: "",
  },
  getters: {
    currentComponent(state) {
      return state.components.find(
        (component) => component.id === state.currentComponentId
      );
    },
  },
  mutations: {
    // 添加画布组件
    addComponent(state, componentData) {
      state.components.push(componentData);
    },
    // 设置选中组件的id
    setActive(state, currentId: string) {
      state.currentComponentId = currentId;
    },
    // 更新组件的值
    updateComponent(state, { key, value, id, isRoot }) {
      // 有id就根据id进行查询
      const currentComponent = state.components.find(
        (component) => component.id === (id || state.currentComponentId)
      );
      if (currentComponent) {
        if (isRoot) {
          // 修改的是第一层元素
          (currentComponent as any)[key] = value;
        } else {
          currentComponent.props[key] = value;
        }
      }
    },
    swapComponent(state, { index1, index2 }) {
      const temp = state.components[index1];
      state.components[index1] = state.components[index2];
      state.components[index2] = temp;
    },
  },
  actions: {},
  modules: {},
});
