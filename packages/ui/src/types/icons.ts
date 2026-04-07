import type { Icon, IconProps } from "iconsax-reactjs";
import * as Icons from "iconsax-reactjs";

export type LIIconName = keyof typeof Icons;
export type { Icon, IconProps };

export const ALL_ICONS: Record<LIIconName, Icon> = Icons;
