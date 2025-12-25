import { useMemo } from "react";
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import type { TextVariant } from "../types";

interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  ref?: React.Ref<HTMLSpanElement>;
  textStyle?: React.CSSProperties;
  className?: string;
}

const Text = ({ children, variant, ref, textStyle, className }: TextProps) => {
  const styles = useMemo(() => ({
    label: style({
      font: 'body',
      fontWeight: 'bold',
      fontFamily: 'sans'
    }),
    caption: style({
      font: 'body-sm',
      fontWeight: 'normal',
      fontFamily: 'sans'
    }),
    description: style({
      font: 'body-lg',
      fontWeight: 'normal',
      fontFamily: 'sans'
    }),
    navigation: style({
      font: 'body-lg',
      fontWeight: 'medium',
      fontFamily: 'sans'
    }),
    default: style({
      font: 'body',
      fontWeight: 'normal',
      fontFamily: 'sans'
    })
  }), []);

  const elementStyle = variant ? styles[variant] : styles.default;
  const combinedClassName = className ? `${elementStyle} ${className}` : elementStyle;

  return (
    <span
      ref={ref}
      className={combinedClassName}
      style={{
        textOverflow: 'clip',
        textWrapMode: 'nowrap',
        ...textStyle
      }}
    >
      {children}
    </span>
  );
}

export default Text;
