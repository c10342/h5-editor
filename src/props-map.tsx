import { PropsToForms } from "./types/props-map";

const fontFamilyArr = [
  { showText: "宋体", value: '"SimSun","STSong"' },
  { showText: "黑体", value: '"SimHei","STHeiti"' },
  { showText: "楷体", value: '"KaiTi","STKaiti"' },
  { showText: "仿宋", value: '"FangSong","STFangsong"' },
  { showText: "Arial", value: '"Arial", sans-serif' },
  { showText: "Arial Black", value: '"Arial Black", sans-serif' },
  { showText: "Comic Sans MS", value: '"Comic Sans MS"' },
  { showText: "Courier New", value: '"Courier New", monospace' },
  { showText: "Georgia", value: '"Georgia", serif' },
  { showText: "Times New Roman", value: '"Times New Roman", serif' },
];

const fontFamilyOptions = fontFamilyArr.map((font) => {
  return {
    value: font.value,
    showText: <span style={{ fontFamily: font.value }}>{font.showText}</span>,
    label: font.showText,
  };
});

function numberToPx(num: any) {
  return num ? `${num}px` : "";
}
function stringToInt(v: string) {
  return parseInt(v);
}

const inputNumber = {
  component: "el-input-number",
  initalTransform: stringToInt,
  afterTransform: numberToPx,
};

const colorPicker = {
  component: "color-picker",
};
const iconSwitch = {
  component: "icon-switch",
  valueProp: "checked",
};
const slider = {
  component: "el-slider",
  eventName: "input",
  initalTransform: stringToInt,
  afterTransform: numberToPx,
};

const select = { component: "el-select", subComponent: "el-option" };
export const mapPropsToForms: PropsToForms = {
  // 公共属性
  // 大小
  height: {
    text: "高度",
    ...inputNumber,
  },
  width: {
    text: "宽度",
    ...inputNumber,
  },
  paddingLeft: {
    text: "左边距",
    ...inputNumber,
  },
  paddingRight: {
    text: "右边距",
    ...inputNumber,
  },
  paddingTop: {
    text: "上边距",
    ...inputNumber,
  },
  paddingBottom: {
    text: "下边距",
    ...inputNumber,
  },
  // 边框
  borderStyle: {
    text: "边框类型",
    ...select,
    options: [
      { value: "none", label: "无" },
      { value: "solid", label: "实线" },
      { value: "dashed", label: "破折线" },
      { value: "dotted", label: "点状线" },
    ],
  },
  borderColor: {
    text: "边框颜色",
    ...colorPicker,
  },
  borderWidth: {
    text: "边框宽度",
    ...slider,
    extraProps: {
      min: 0,
      max: 10,
      step: 1,
    },
  },
  borderRadius: {
    text: "边框圆角",
    ...slider,
    extraProps: {
      min: 0,
      max: 50,
      step: 1,
    },
  },
  // shadow and opacity
  boxShadow: {
    // text: "边框圆角",
    component: "shadow-picker",
    valueProp: "value",
  },
  opacity: {
    text: "透明度",
    ...slider,
    initalTransform: (v: number) => v * 100,
    afterTransform: (e: number) => e / 100,
    extraProps: { min: 0, max: 100, step: 0.1 },
  },
  // 位置
  // position: {
  //   component: 'a-select',
  //   subComponent: 'a-select-option',
  //   text: '定位',
  //   options: [
  //     { value: '', text: '默认' },
  //     { value: 'absolute', text: '绝对定位' }
  //   ]
  // },
  left: {
    text: "X轴坐标",
    ...inputNumber,
  },
  top: {
    text: "Y轴坐标",
    ...inputNumber,
  },
  // 文本组件特有属性
  text: {
    component: "el-input",
    text: "文本",
    extraProps: {
      row: 3,
      type: "textarea",
    },
    eventName: "input",
  },
  fontSize: {
    text: "字号",
    ...inputNumber,
  },
  fontFamily: {
    text: "字体",
    ...select,
    options: [{ showText: "无", value: "", label: "无" }, ...fontFamilyOptions],
  },
  fontWeight: {
    ...iconSwitch,
    initalTransform: (v: string) => v === "bold",
    afterTransform: (e: boolean) => (e ? "bold" : "normal"),
    extraProps: {
      text: "加粗",
    },
  },
  fontStyle: {
    ...iconSwitch,
    initalTransform: (v: string) => v === "italic",
    afterTransform: (e: boolean) => (e ? "italic" : "normal"),
    extraProps: {
      text: "斜体",
    },
  },
  textDecoration: {
    ...iconSwitch,
    initalTransform: (v: string) => v === "underline",
    afterTransform: (e: boolean) => (e ? "underline" : "none"),
    extraProps: {
      text: "下划线",
    },
  },
  lineHeight: {
    text: "行高",
    ...slider,
    extraProps: {
      min: 0,
      max: 3,
      step: 0.1,
    },
    initalTransform: (v: string) => parseFloat(v),
    afterTransform: (e: any) => e.toString(),
  },
  textAlign: {
    component: "el-radio-group",
    text: "对齐",
    subComponent: "el-radio-button",
    options: [
      {
        label: "left",
        showText: "左",
      },
      {
        label: "center",
        showText: "中",
      },
      {
        label: "right",
        showText: "右",
      },
    ],
  },
  color: {
    text: "文字颜色",
    ...colorPicker,
  },
  backgroundColor: {
    text: "背景颜色",
    ...colorPicker,
  },
  imageSrc: {
    component: "image-process",
  },
  backgroundSize: {
    text: "背景大小",
    ...select,
    options: [
      { value: "contain", label: "自动缩放" },
      { value: "cover", label: "自动填充" },
      { value: "", label: "默认" },
    ],
  },
  backgroundRepeat: {
    text: "背景重复",
    ...select,
    options: [
      { value: "no-repeat", label: "无重复" },
      { value: "repeat-x", label: "X轴重复" },
      { value: "repeat-y", label: "Y轴重复" },
      { value: "repeat", label: "全部重复" },
    ],
  },
};
