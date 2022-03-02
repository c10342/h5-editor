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

export const mapPropsToForms: PropsToForms = {
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
    component: "el-input-number",
    text: "字号",
    initalTransform: (v: string) => parseInt(v),
    afterTransform: (e: any) => (e ? `${e}px` : ""),
  },
  lineHeight: {
    component: "el-slider",
    text: "行高",
    extraProps: {
      min: 0,
      max: 3,
      step: 0.1,
    },
    eventName: "input",
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
  fontFamily: {
    component: "el-select",
    text: "字体",
    subComponent: "el-option",
    options: [{ showText: "无", value: "", label: "无" }, ...fontFamilyOptions],
  },
  color: {
    component: "color-picker",
    text: "颜色",
  },
  imageSrc: {
    component: "image-process",
  },
};
