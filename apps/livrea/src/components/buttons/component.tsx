"use client";

import { ActionButton } from "@react-spectrum/s2";
import { ALL_ICONS } from "@/components/icons/icons";
import type { IconButtonProps } from "./types";

const IconButton = ({
   icon,
   onPress,
   variant = "Outline",
   isLoading = false,
   children,
   style,
   buttonRef,
   size = "M",
   isQuiet = true,
   isDisabled = false,
   ariaLabel,
}: IconButtonProps) => {
   const Icon = icon ? ALL_ICONS[icon] : null;

   return (
      <ActionButton
         ref={buttonRef}
         aria-label={ariaLabel || (icon ? `${icon} button` : "Action button")}
         isPending={isLoading}
         isQuiet={isQuiet}
         isDisabled={isDisabled}
         onPress={onPress}
         size={size}
         UNSAFE_style={{
            alignItems: "center",
            borderRadius: "100%",
            cursor: isDisabled ? "default" : "pointer",
            display: "inline-flex",
            height: 40,
            justifyContent: "center",
            padding: 0,
            width: 40,
            ...style,
         }}>
         {children ? children : Icon && <Icon size={24} variant={variant} />}
      </ActionButton>
   );
};

export default IconButton;
