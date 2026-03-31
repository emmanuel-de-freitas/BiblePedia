"use client";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useMemo } from "react";
import type { TextVariant } from "@/types";

interface TextProps {
   children: React.ReactNode;
   variant?: TextVariant;
   ref?: React.Ref<HTMLSpanElement>;
   textStyle?: React.CSSProperties;
   className?: string;
}

const Text = ({ children, variant, ref, textStyle, className }: TextProps) => {
   const styles = useMemo(
      () => ({
         caption: style({
            font: "body-sm",
            fontFamily: "sans",
            fontWeight: "normal",
            userSelect: "none",
         }),
         default: style({
            font: "body",
            fontFamily: "sans",
            fontWeight: "normal",
            userSelect: "none",
         }),
         description: style({
            font: "body-lg",
            fontFamily: "sans",
            fontWeight: "normal",
            userSelect: "none",
         }),
         label: style({
            font: "body",
            fontFamily: "sans",
            fontWeight: "bold",
            userSelect: "none",
         }),
         navigation: style({
            font: "body-lg",
            fontFamily: "sans",
            fontWeight: "medium",
            userSelect: "none",
         }),
      }),
      [],
   );

   const elementStyle = variant ? styles[variant] : styles.default;
   const combinedClassName = className ? `${elementStyle} ${className}` : elementStyle;

   return (
      <span
         ref={ref}
         className={combinedClassName}
         style={{
            ...textStyle,
            textOverflow: "clip",
            textWrapMode: "nowrap",
         }}>
         {children}
      </span>
   );
};

export default Text;
