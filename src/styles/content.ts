
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };


const containerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  borderRadius: 'pill',
  backgroundColor: 'base',
});


const contentStyle = style({
  flex: 1,
  overflowY: 'auto',
  paddingX: 24,
  paddingY: 24,
});


export {
  containerStyle,
  contentStyle,
}
