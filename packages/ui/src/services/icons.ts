import Home from '@react-spectrum/s2/icons/Home';
import CCLibrary from '@react-spectrum/s2/icons/CCLibrary';
import StickyNote from '@react-spectrum/s2/icons/StickyNote';
import Community from '@react-spectrum/s2/icons/Community';

import * as Icons from 'iconsax-reactjs';
import type { IconProps, Icon } from 'iconsax-reactjs';

// React Spectrum icons
export const spectrumIcons = {
  Home,
  CCLibrary,
  StickyNote,
  Community
} as const;

export type SpectrumIconName = keyof typeof spectrumIcons;

// Iconsax icons
export const ALL_ICONS: Record<string, Icon> = Icons;
export type LIIconName = keyof typeof Icons;

// Re-export types
export type { IconProps, Icon };
