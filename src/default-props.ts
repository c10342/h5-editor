import {
  CommonDefaultProps,
  ImageDefaultProps,
  ShapeDefaultProps,
  TextDefaultProps,
} from "@/types/default-props";
import { mapValues } from "lodash-es";

// the common default props, all the components should have these props
export const commonDefaultProps: CommonDefaultProps = {
  // actions
  actionType: "",
  url: "",
  // size
  height: "",
  width: "318px",
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingTop: "0px",
  paddingBottom: "0px",
  // border type
  borderStyle: "none",
  borderColor: "#000",
  borderWidth: "0",
  borderRadius: "0",
  // shadow and opacity
  boxShadow: "0 0 0 #000000",
  opacity: 1,
  // position and x,y
  position: "absolute",
  left: "0",
  top: "0",
  right: "0",
};
export const textDefaultProps: TextDefaultProps = {
  // basic props - font styles
  text: "正文内容",
  fontSize: "14px",
  fontFamily: "",
  fontWeight: "normal",
  fontStyle: "normal",
  textDecoration: "none",
  lineHeight: "1",
  textAlign: "left",
  color: "#000000",
  backgroundColor: "",
  ...commonDefaultProps,
};

export const imageDefaultProps: ImageDefaultProps = {
  imageSrc: "",
  ...commonDefaultProps,
};

export const shapeDefaultProps: ShapeDefaultProps = {
  backgroundColor: "",
  ...commonDefaultProps,
};

export const isEditingProp = {
  isEditing: {
    type: Boolean,
    default: false,
  },
};

export const transformToComponentProps = (props: { [key: string]: any }) => {
  const mapProps = mapValues(props, (item) => {
    return {
      type: item.constructor,
      default: item,
    };
  });
  return mapProps;
};
