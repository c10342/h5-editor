import { App, defineComponent } from "vue";
// 将jsx写法转化为template支持的形式
const RenderVNode = defineComponent({
  props: {
    vNode: {
      type: [Object, String],
      required: true,
    },
  },
  render() {
    return this.vNode;
  },
});

RenderVNode.install = (app: App) => {
  app.component("RenderVNode", RenderVNode);
};

export default RenderVNode;
