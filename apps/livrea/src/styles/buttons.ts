'use client';

import { baseColor, focusRing, fontRelative, lightDark, style } from "@react-spectrum/s2/style" with { type: 'macro' };

const iconOnly = ':has([slot=icon], [slot=avatar]):not(:has([data-rsp-slot=text]))';
const textOnly = ':has([data-rsp-slot=text]):not(:has([slot=icon], [slot=avatar]))';
export const btnStyles = style({
  ...focusRing(),
  display: 'grid',
  justifyContent: 'start',
  fontWeight: 'medium',
  width: '100%',
  userSelect: 'none',
  gap: 8,
  minHeight: 28,
  transition: 'default',
  borderRadius: 'lg',
  alignSelf: 'start',
  textDecoration: 'none',
  position: 'relative',
  paddingX: 12,
  paddingY: 8,
  gridTemplateAreas: {
    default: ['icon text'],
    [iconOnly]: ['icon'],
    [textOnly]: ['text']
  },
  gridTemplateColumns: {
    default: ['auto', 'auto'],
    [iconOnly]: ['auto'],
    [textOnly]: ['auto']
  },
  
  backgroundColor: {
    default:'transparent',
    isHovered: 'gray-100',
    isPressed: lightDark('accent-1000', 'accent-600'),
    isSelected: {
      default: baseColor('transparent-overlay-100'),
      isEmphasized: {
        default: lightDark('accent-900', 'accent-700'),
        isHovered: lightDark('accent-1000', 'accent-600'),
        isPressed: lightDark('accent-1000', 'accent-600'),
        isFocusVisible: lightDark('accent-1000', 'accent-600')
      },
      isDisabled: {
        default: 'gray-100',
        isQuiet: 'transparent'
      }
    },
    isStaticColor: {
      ...baseColor('transparent-overlay-100'),
      default: 'transparent',
      isSelected: {
        default: baseColor('transparent-overlay-800'),
        isDisabled: 'transparent'
      }
    }
  },
  color: {
    default: baseColor('neutral'),
    isSelected: {
      default: 'gray-25',
      isEmphasized: 'white'
    },
    isDisabled: 'disabled',
    isStaticColor: {
      default: baseColor('transparent-overlay-800'),
      isSelected: 'auto',
      isDisabled: 'transparent-overlay-400'
    }
  },
  '--iconPrimary': {
    type: 'fill',
    value: 'currentColor'
  },
  outlineColor: {
    default: 'focus-ring',
    isStaticColor: 'transparent-overlay-1000',
    forcedColors: 'Highlight'
  },
  '--badgeTop': {
    type: 'top',
    value: {
      default: 'calc(self(height)/2 - var(--iconWidth)/2)',
      [textOnly]: 0
    }
  },
  '--iconWidth': {
    type: 'width',
    value: fontRelative(20)
  },
  '--badgePosition': {
    type: 'width',
    value: {
      default: '--iconWidth',
      [textOnly]: 'full'
    }
  },
});
