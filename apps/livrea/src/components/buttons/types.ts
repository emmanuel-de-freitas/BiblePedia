import type { FocusableRefValue } from "@react-types/shared";
import type { IconProps, LIIconName } from "@/components/icons/types";

export type IconButtonBase = {
   onPress?: () => void;
   variant?: IconProps["variant"];
   isLoading?: boolean;
   style?: React.CSSProperties;
   buttonRef?: React.Ref<FocusableRefValue<HTMLButtonElement>>;
   size?: "S" | "M" | "L" | "XL";
   isQuiet?: boolean;
   isDisabled?: boolean;
   ariaLabel?: string;
};

export type IconButtonWithChildren = IconButtonBase & {
   children: React.ReactNode;
   icon?: never;
};

export type IconButtonWithIcon = IconButtonBase & {
   icon: LIIconName;
   children?: never;
};

export interface NavButtonProps {
   icon?: LIIconName;
   label?: string;
   route: string;
   isQuiet?: boolean;
   buttonStyle?: React.CSSProperties;
}

export type IconButtonProps = IconButtonWithChildren | IconButtonWithIcon;
