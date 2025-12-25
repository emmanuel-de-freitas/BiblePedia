// Note: The style macro should be imported directly from '@react-spectrum/s2/style' with { type: 'macro' }
// in your components to avoid build issues

// Export utility types for style properties
export type { CSSProperties } from 'react';

// Style utilities for common patterns
export const styleUtils = {
  // Center content
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  // Flex row
  flexRow: {
    display: 'flex',
    flexDirection: 'row' as const
  },

  // Flex column
  flexCol: {
    display: 'flex',
    flexDirection: 'column' as const
  },

  // Full width and height
  fullSize: {
    width: '100%',
    height: '100%'
  },

  // Hidden but accessible
  visuallyHidden: {
    position: 'absolute' as const,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap' as const,
    border: 0
  },

  // Truncate text
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const
  },

  // Reset button styles
  buttonReset: {
    background: 'none',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit'
  }
} as const;

// Common animation durations (in ms)
export const animations = {
  fast: 150,
  normal: 250,
  slow: 350,
  verySlow: 500
} as const;

// Common z-index values
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500
} as const;
