import CCLibrary from "@react-spectrum/s2/icons/CCLibrary";
import Community from "@react-spectrum/s2/icons/Community";
import Home from "@react-spectrum/s2/icons/Home";
import StickyNote from "@react-spectrum/s2/icons/StickyNote";
import type { Icon } from "iconsax-reactjs";
import * as Icons from "iconsax-reactjs";

// React Spectrum icons
export const spectrumIcons = {
   CCLibrary,
   Community,
   Home,
   StickyNote,
} as const;

export const ALL_ICONS: Record<string, Icon> = Icons;
