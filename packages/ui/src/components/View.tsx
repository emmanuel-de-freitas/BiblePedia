import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import type React from "react";

type CSSProperties = Parameters<typeof style>[0];

interface IViewProps extends CSSProperties {
  children: React.ReactNode;
  // display?: CSSProperties["display"];
  // flexDirection?: CSSProperties["flexDirection"];
  // alignItems?: CSSProperties["alignItems"];
  // justifyContent?: CSSProperties["justifyContent"];
  // margin?: CSSProperties["margin"];
  // padding?: CSSProperties["padding"];
  // height?: CSSProperties["height"];
  // width?: CSSProperties["width"];
  // borderRadius?: CSSProperties["borderRadius"];
  // boxShadow?: CSSProperties["boxShadow"];
  // backgroundColor?: CSSProperties["backgroundColor"];
}

const View = ({ children, ...props }: IViewProps) => {
  const divStyles: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "base",
    borderRadius: "xl",
    boxShadow: "emphasized",
    padding: 20,
    margin: 0,
  } as const;

  const properties = style<Omit<IViewProps, "children">>({
    ...divStyles,
  });

  return <div className={properties({ ...props })}>{children}</div>;
};

export default View;
