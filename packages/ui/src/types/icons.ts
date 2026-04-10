import type { Icon, IconProps } from "iconsax-reactjs";
import * as Icons from "iconsax-reactjs";
import { Book } from "@/components";

export type LIIconName = keyof typeof Icons | keyof typeof Book;
export type { Icon, IconProps };

export const ALL_ICONS: Record<LIIconName, Icon> = { ...Icons, Book };
