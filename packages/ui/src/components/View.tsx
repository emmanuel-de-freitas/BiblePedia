import { style, type RenderProps } from "@react-spectrum/s2/style" with { type: 'macro' };

type CSSProperties = Parameters<typeof style>[0];
type Props = Parameters<typeof style>[1];
interface IViewProps {
  children: React.ReactNode;
  display: CSSProperties['display'];
  flexDirection: CSSProperties['flexDirection'];
  alignItems: CSSProperties['alignItems'];
  justifyContent: CSSProperties['justifyContent'];
  margin: CSSProperties['margin'];
  padding: CSSProperties['padding'];
  height: CSSProperties['height'];
  width: CSSProperties['width'];
  borderRadius: CSSProperties['borderRadius'];
  boxShadow: CSSProperties['boxShadow'];
  backgroundColor: CSSProperties['backgroundColor'];
};

const View = ({ children, ...props }: IViewProps) => {


  const properties = style<CSSProperties>({
    display: props.display || 'flex',
    flexDirection: props.flexDirection || 'column',
    alignItems: props.alignItems || 'center',
    justifyContent: props.justifyContent || 'center',
    width: props.width || '100%',
    height: props.height || '100%',
    padding: props.padding || 0,
    backgroundColor: props.backgroundColor || 'white',
    borderRadius: props.borderRadius || 'sm',
    boxShadow: props.boxShadow || 'none'
  });

  return (<div className={properties({ ...props })}>{children}</div>);
};

export default View;
