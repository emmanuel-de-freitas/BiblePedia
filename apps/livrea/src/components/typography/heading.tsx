"use client";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useMemo } from "react";
import type { HeadingLevel } from "@/types";

interface HeadingProps<L extends HeadingLevel = HeadingLevel> {
   children: React.ReactNode;
   level: L;
   className?: string;
}

const Heading = ({ children, level, className }: HeadingProps) => {
   const styles = useMemo(
      () => ({
         1: style({
            font: "heading-2xl",
            fontFamily: "sans",
            marginY: 8,
            textTransform: "capitalize",
            userSelect: "none",
         }),
         2: style({
            font: "heading-xl",
            fontFamily: "serif",
            textTransform: "capitalize",
            userSelect: "none",
         }),
         3: style({
            font: "heading-lg",
            fontFamily: "serif",
            fontWeight: "bold",
            marginY: 0,
            textTransform: "capitalize",
            userSelect: "none",
         }),
         4: style({
            font: "heading",
            fontFamily: "serif",
            fontWeight: "normal",
            marginY: 4,
            textTransform: "capitalize",
            userSelect: "none",
         }),
         5: style({
            font: "heading-sm",
            fontFamily: "sans",
            fontWeight: "normal",
            textTransform: "capitalize",
            userSelect: "none",
         }),
         6: style({
            font: "heading-xs",
            fontFamily: "sans",
            fontWeight: "normal",
            userSelect: "none",
         }),
      }),
      [],
   );

   const elementStyle = useMemo(() => styles[level], [styles, level]);
   const combinedClassName = className ? `${elementStyle} ${className}` : elementStyle;

   const renderElement = () => {
      switch (level) {
         case 1:
            return <h1 className={combinedClassName}>{children}</h1>;
         case 2:
            return <h2 className={combinedClassName}>{children}</h2>;
         case 3:
            return <h3 className={combinedClassName}>{children}</h3>;
         case 4:
            return <h4 className={combinedClassName}>{children}</h4>;
         case 5:
            return <h5 className={combinedClassName}>{children}</h5>;
         default:
            return <h1 className={combinedClassName}>{children}</h1>;
      }
   };

   return renderElement();
};

export default Heading;
