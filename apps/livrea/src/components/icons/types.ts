import type * as Icons from "iconsax-reactjs";
import type {Icon, IconProps} from "iconsax-reactjs";
import type {spectrumIcons} from "./icons";

type SpectrumIconName = keyof typeof spectrumIcons;

interface IconComponentProps {
   icon: LIIconName;
   variant?: IconProps["variant"];
   size?: number;
   color?: string;
   className?: string;
}

// Iconsax icons
type LIIconName = keyof typeof Icons;

// Re-export types
export type { IconProps, Icon, SpectrumIconName, LIIconName, IconComponentProps };
