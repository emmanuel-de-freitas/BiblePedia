import { style } from "@react-spectrum/s2/style" with { type: 'macro' };
import { useMemo } from "react";
import type { HeadingLevel } from "../types";

interface HeadingProps<L extends HeadingLevel = HeadingLevel> {
  children: React.ReactNode;
  level: L;
  className?: string;
}

const Heading = ({ children, level, className }: HeadingProps) => {
  const styles = useMemo(() => ({
    1: style({
      font: 'heading-2xl',
      marginY: 8,
      userSelect: 'none',
      textTransform: 'capitalize',
      fontFamily: 'sans'
    }),
    2: style({
      userSelect: 'none',
      font: 'heading-xl',
      textTransform: 'capitalize',
      fontFamily: 'sans'
    }),
    3: style({
      userSelect: 'none',
      font: 'heading-lg',
      fontWeight: 'bold',
      textTransform: 'capitalize',
      marginY: 0,
      fontFamily: 'sans'
    }),
    4: style({
      userSelect: 'none',
      font: 'heading',
      textTransform: 'capitalize',
      fontWeight: 'normal',
      fontFamily: 'sans'
    }),
    5: style({
      userSelect: 'none',
      font: 'heading-sm',
      textTransform: 'capitalize',
      fontWeight: 'normal',
      fontFamily: 'sans'
    }),
    6: style({
      userSelect: 'none',
      font: 'heading-xs',
      fontWeight: 'normal',
      fontFamily: 'sans'
    })
  }), []);

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
  }

  return renderElement();
};

export default Heading;
