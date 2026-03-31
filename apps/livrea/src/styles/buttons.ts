"use client";

import { baseColor, focusRing, fontRelative, lightDark, style } from "@react-spectrum/s2/style" with { type: "macro" };

const iconOnly = ":has([slot=icon], [slot=avatar]):not(:has([data-rsp-slot=text]))";
const textOnly = ":has([data-rsp-slot=text]):not(:has([slot=icon], [slot=avatar]))";
export const btnStyles = style({
   ...focusRing(),
   "--badgePosition": {
      type: "width",
      value: {
         default: "--iconWidth",
         [textOnly]: "full",
      },
   },
   "--badgeTop": {
      type: "top",
      value: {
         default: "calc(self(height)/2 - var(--iconWidth)/2)",
         [textOnly]: 0,
      },
   },
   "--iconPrimary": {
      type: "fill",
      value: "currentColor",
   },
   "--iconWidth": {
      type: "width",
      value: fontRelative(20),
   },
   alignSelf: "start",

   backgroundColor: {
      default: "transparent",
      isHovered: "gray-100",
      isPressed: lightDark("accent-1000", "accent-600"),
      isSelected: {
         default: baseColor("transparent-overlay-100"),
         isDisabled: {
            default: "gray-100",
            isQuiet: "transparent",
         },
         isEmphasized: {
            default: lightDark("accent-900", "accent-700"),
            isFocusVisible: lightDark("accent-1000", "accent-600"),
            isHovered: lightDark("accent-1000", "accent-600"),
            isPressed: lightDark("accent-1000", "accent-600"),
         },
      },
      isStaticColor: {
         ...baseColor("transparent-overlay-100"),
         default: "transparent",
         isSelected: {
            default: baseColor("transparent-overlay-800"),
            isDisabled: "transparent",
         },
      },
   },
   borderRadius: "lg",
   color: {
      default: baseColor("neutral"),
      isDisabled: "disabled",
      isSelected: {
         default: "gray-25",
         isEmphasized: "white",
      },
      isStaticColor: {
         default: baseColor("transparent-overlay-800"),
         isDisabled: "transparent-overlay-400",
         isSelected: "auto",
      },
   },
   display: "grid",
   fontWeight: "medium",
   gap: 8,
   gridTemplateAreas: {
      default: ["icon text"],
      [iconOnly]: ["icon"],
      [textOnly]: ["text"],
   },
   gridTemplateColumns: {
      default: ["auto", "auto"],
      [iconOnly]: ["auto"],
      [textOnly]: ["auto"],
   },
   justifyContent: "start",
   minHeight: 28,
   outlineColor: {
      default: "focus-ring",
      forcedColors: "Highlight",
      isStaticColor: "transparent-overlay-1000",
   },
   paddingX: 12,
   paddingY: 8,
   position: "relative",
   textDecoration: "none",
   transition: "default",
   userSelect: "none",
   width: "100%",
});
