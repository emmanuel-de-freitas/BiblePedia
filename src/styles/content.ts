
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };


const containerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  height: 'full',
  width: 'full',
  borderRadius: 'xl',
  backgroundColor: 'base',
});


const contentStyle = style({
  flex: 1,
  overflowY: 'auto',
  paddingX: 24,
  paddingY: 24,
});

const windowStyle = style({
  marginHorizontal: 32,
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gridTemplateRows: 'auto',
  alignItems: 'stretch',
  gridTemplateAreas: [
    'sidebar content'
  ],
});


export {
  windowStyle,
  containerStyle,
  contentStyle,
}
