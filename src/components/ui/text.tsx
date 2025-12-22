import { useMemo } from "react";
import { style } from '@react-spectrum/s2/style' with {type: 'macro'};

interface ITextProps {
  children: React.ReactNode;
  variant?: 'label' | 'caption' | 'description' | 'navigation';
}

const Text = ({ children, variant }: ITextProps) => {

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


  return <span className={variant ? styles[variant] : styles.default}>{children}</span>;
}

export default Text;
