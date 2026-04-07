"use client";

import { Button } from "@heroui/react";
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

	// Map size to HeroUI sizes
	const heroSize = size === "S" ? "sm" : size === "L" ? "lg" : "md";

	return (
		<Button
			ref={buttonRef}
			aria-label={ariaLabel || (icon ? `${icon} button` : "Action button")}
			isPending={isLoading}
			isIconOnly
			variant={isQuiet ? "ghost" : "secondary"}
			isDisabled={isDisabled}
			onPress={onPress}
			size={heroSize}
			className="rounded-full min-w-10 h-10"
			style={style}
		>
			{children ? children : Icon && <Icon size={24} variant={variant} />}
		</Button>
	);
};

export default IconButton;
