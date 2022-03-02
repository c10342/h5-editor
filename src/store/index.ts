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
  },
  {
    props: {
      text: "hello2",
      fontSize: "10px",
    },
    name: "custom-text",
    id: uuidv4(),
  },
  {
    props: { text: "hello3", fontSize: "15px" },
    name: "custom-text",
    id: uuidv4(),
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
    updateComponent(state, { key, value }) {
      const currentComponent = state.components.find(
        (component) => component.id === state.currentComponentId
      );
      if (currentComponent) {
        currentComponent.props[key] = value;
      }
    },
  },
  actions: {},
  modules: {},
});
