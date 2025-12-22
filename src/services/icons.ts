
import Home from '@react-spectrum/s2/icons/Home';
import CCLibrary from '@react-spectrum/s2/icons/CCLibrary';
import StickyNote from '@react-spectrum/s2/icons/StickyNote';
import Community from '@react-spectrum/s2/icons/Community';

// import icon.
import { Home2, Book1, Stickynote, People, type IconProps, type Icon } from 'iconsax-reactjs';

export const allIcons = {
  Home,
  CCLibrary,
  StickyNote,
  Community
}

export const ALL_ICONS : Record<string, Icon> = {
  Home2,
  Book1,
  People,
  Stickynote
};

export type LivIconName = keyof typeof allIcons;
export type LIIconName = keyof typeof ALL_ICONS;
export type { IconProps, Icon };
