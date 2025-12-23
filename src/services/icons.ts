
import Home from '@react-spectrum/s2/icons/Home';
import CCLibrary from '@react-spectrum/s2/icons/CCLibrary';
import StickyNote from '@react-spectrum/s2/icons/StickyNote';
import Community from '@react-spectrum/s2/icons/Community';

// import icon.
import { Home2, Book1, Stickynote, People, type IconProps, type Icon } from 'iconsax-reactjs';
import * as Icons from 'iconsax-reactjs';

export const allIcons = {
  Home,
  CCLibrary,
  StickyNote,
  Community
}



export type LivIconName = keyof typeof allIcons;
export type LIIconName = keyof typeof Icons;
export type { IconProps, Icon };

export const ALL_ICONS: Record<LIIconName, Icon> = Icons;
