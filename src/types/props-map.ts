import { VNode } from "vue";
import {
  ImageDefaultProps,
  ShapeDefaultProps,
  TextDefaultProps,
} from "./default-props";

export interface PropToForm {
  // 渲染的组件名称
  component: string;
  // 子组件
  subComponent?: string;
  // 组件的属性
  extraProps?: { [key: string]: any };
  // label标签
  text: string;
  // 子组件参数
  options?: { showText: string | VNode; [key: string]: any }[];
  // 数据初始化转换
  initalTransform?: (v: any) => any;
  //   数据结束后转换
  afterTransform?: (v: any) => any;
  // 绑定值的key
  valueProp?: string;
  // 需要绑定的事件名称
  eventName?: string;
  // 某些元素需要跟父元素进行联动
  parent?: string;
}

export type PropsToForms = {
  [p in keyof TextDefaultProps &
    ImageDefaultProps &
    ShapeDefaultProps]?: PropToForm;
};
