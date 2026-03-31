"use client";

import { ActionButton } from "@react-spectrum/s2";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Icon from "@/components/icons/component";
import Text from "@/components/typography/text";
import type { NavButtonProps } from "./types";

const MotionText = motion.create(Text, { forwardMotionProps: true });

const NavButton = ({ icon, label, route, isQuiet = true, buttonStyle }: NavButtonProps) => {
   const showLabel = useMemo(() => label !== undefined, [label]);
   const pathname = usePathname();
   const isActive = pathname === route || pathname.startsWith(`${route}/`);

   return (
      <Link href={route} style={{ textDecoration: "none" }}>
         <ActionButton
            aria-label={label || route}
            isQuiet={!isActive && isQuiet}
            UNSAFE_style={{
               backgroundColor: isActive ? "ButtonText" : undefined,
               color: isActive ? "Window" : undefined,
               cursor: "pointer",
               display: "flex",
               gap: 12,
               justifyContent: showLabel ? "start" : "center",
               minHeight: 44,
               paddingBottom: 8,
               paddingTop: 8,
               width: showLabel ? "auto" : "100%",
               ...buttonStyle,
            }}>
            {icon && <Icon icon={icon} variant={isActive ? "Bold" : "Outline"} />}
            <AnimatePresence>
               {showLabel ? (
                  <MotionText
                     key={`${icon}-${label}`}
                     textStyle={{ color: isActive ? "Window" : undefined, fontWeight: isActive ? "bold" : "normal" }}
                     variant="navigation"
                     layout="size"
                     initial={{
                        opacity: 0,
                        width: 0,
                     }}
                     animate={{
                        opacity: 1,
                        transition: {
                           width: {
                              delay: 0.1,
                              duration: 0.2,
                           },
                        },
                        width: "min-content",
                     }}
                     exit={{
                        opacity: 0,
                        transition: {
                           type: "tween",
                           width: {
                              delay: 0.1,
                              duration: 0.2,
                           },
                        },
                        width: 0,
                     }}>
                     {label}
                  </MotionText>
               ) : null}
            </AnimatePresence>
         </ActionButton>
      </Link>
   );
};

export default NavButton;
