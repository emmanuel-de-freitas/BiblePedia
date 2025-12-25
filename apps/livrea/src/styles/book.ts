import { style } from '@react-spectrum/s2/style' with { type: 'macro' };


const bookTitleStyle = style({
  font: 'heading',
  fontWeight: 'bold',
});

const bookAuthorStyle = style({
  font: 'body',
  color: 'gray-700',
});

const bookMetaStyle = style({
  font: 'body-sm',
  color: 'gray-600',
});

export {
  bookTitleStyle,
  bookAuthorStyle,
  bookMetaStyle,
}
