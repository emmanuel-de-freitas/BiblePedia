import type * as Icons from "iconsax-reactjs";
import type { Icon, IconProps } from "iconsax-reactjs";

// Iconsax icons
type LIIconName = keyof typeof Icons;

interface IconComponentProps {
  icon: LIIconName;
  variant?: IconProps["variant"];
  size?: number;
  color?: string;
  className?: string;
}

// Re-export types
export type { IconProps, Icon, LIIconName, IconComponentProps };
