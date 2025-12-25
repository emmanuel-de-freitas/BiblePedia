// Components
export { default as Heading } from './components/Heading';
export { default as Text } from './components/Text';
export { default as Icon } from './components/Icon';
export { default as IconButton } from './components/IconButton';
export { default as NavButton } from './components/NavButton';

// Types
export type {
  HeadingLevel,
  FontStyle,
  TextVariant,
  IconProps,
  Icon as IconType,
  FocusableRefValue
} from './types';

// Icon utilities
export {
  ALL_ICONS,
  spectrumIcons,
  type LIIconName,
  type SpectrumIconName
} from './services/icons';

// Style utilities
// Note: import style macro directly from '@react-spectrum/s2/style' in your components
export { styleUtils, animations, zIndex } from './style';

// Re-export commonly used React Spectrum components
export {
  ActionButton,
  Button,
  Provider
} from '@react-spectrum/s2';

// Re-export motion utilities for animations
export { motion, AnimatePresence } from 'motion/react';
