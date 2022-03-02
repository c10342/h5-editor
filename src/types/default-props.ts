export interface CommonDefaultProps {
  // actions
  actionType: string;
  url: string;
  // size
  height: string;
  width: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
  // border type
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  // shadow and opacity
  boxShadow: string;
  opacity: number;
  // position and x,y
  position: string;
  left: string;
  top: string;
  right: string;
}
export interface TextDefaultProps extends CommonDefaultProps {
  // basic props - font styles
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  lineHeight: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
}

export interface ImageDefaultProps extends CommonDefaultProps {
  imageSrc: string;
}

export interface ShapeDefaultProps extends CommonDefaultProps {
  backgroundColor: string;
}
