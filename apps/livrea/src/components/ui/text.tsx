import { useMemo } from "react";
import { style } from '@react-spectrum/s2/style' with {type: 'macro'};

interface ITextProps {
  children: React.ReactNode;
  variant?: 'label' | 'caption' | 'description' | 'navigation';
  ref?: React.Ref<HTMLSpanElement>;
  textStyle?: React.CSSProperties;
}

const Text = ({ children, variant, ref, textStyle }: ITextProps) => {

  const base = {
    fontWeight: 'normal',
    fontFamily: 'sans'
  };
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
  }), [variant]);


  return <span ref={ref} className={variant ? styles[variant] : styles.default} style={{ textOverflow: 'clip', textWrapMode: 'nowrap', ...textStyle }}>{children}</span>;
}

export default Text;
