"use client";

import {ActionButton} from "@react-spectrum/s2";
import {AnimatePresence, motion} from "motion/react";
import {useMemo} from "react";
import {useMatch, useNavigate} from "react-router-dom";
import type {LIIconName} from "../services/icons";
import Icon from "./Icon";
import Text from "./Text";

const MotionText = motion.create(Text, { forwardMotionProps: true });

interface NavButtonProps {
  icon?: LIIconName;
  label?: string;
  route: string;
  isQuiet?: boolean;
  buttonStyle?: React.CSSProperties;
}

const NavButton = ({ icon, label, route, isQuiet = true, buttonStyle }: NavButtonProps) => {
  const showLabel = useMemo(() => label !== undefined, [label]);
  const navigate = useNavigate();

  const handleOnPress = () => {
    navigate(route, { relative: "route", replace: true });
  };

  const isActive = !!useMatch({ path: route, end: true });

  return (
    <ActionButton
      aria-label={label || route}
      isQuiet={!isActive && isQuiet}
      onPress={handleOnPress}
      UNSAFE_style={{
        minHeight: 44,
        display: "flex",
        width: showLabel ? "auto" : "100%",
        gap: 12,
        justifyContent: showLabel ? "start" : "center",
        cursor: "pointer",
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: isActive ? "ButtonText" : undefined,
        color: isActive ? "Window" : undefined,
        ...buttonStyle,
      }}
    >
      {icon && <Icon icon={icon} variant={isActive ? "Bold" : "Outline"} />}
      <AnimatePresence>
        {showLabel ? (
          <MotionText
            key={`${icon}-${label}`}
            textStyle={{ fontWeight: isActive ? "bold" : "normal", color: isActive ? "Window" : undefined }}
            variant="navigation"
            layout="size"
            initial={{
              opacity: 0,
              width: 0,
            }}
            animate={{
              opacity: 1,
              width: "min-content",
              transition: {
                width: {
                  delay: 0.1,
                  duration: 0.2,
                },
              },
            }}
            exit={{
              opacity: 0,
              width: 0,
              transition: {
                type: "tween",
                width: {
                  delay: 0.1,
                  duration: 0.2,
                },
              },
            }}
          >
            {label}
          </MotionText>
        ) : null}
      </AnimatePresence>
    </ActionButton>
  );
};

export default NavButton;
