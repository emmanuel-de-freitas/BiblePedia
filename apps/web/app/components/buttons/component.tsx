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
	isQuiet = true,
	isDisabled = false,
	ariaLabel,
	size,
}: IconButtonProps) => {
	const Icon = icon ? ALL_ICONS[icon] : null;

	const sizes: Record<number, "sm" | "md" | "lg"> = {
		12: "sm",
		16: "sm",
		18: "md",
		24: "md",
		28: "lg",
		32: "lg",
	};

	return (
		<Button
			ref={buttonRef}
			aria-label={ariaLabel || (icon ? `${icon} button` : "Action button")}
			isPending={isLoading}
			isIconOnly
			variant={isQuiet ? "ghost" : "secondary"}
			isDisabled={isDisabled}
			onPress={onPress}
			size={size ? sizes[size] : "lg"}
			className="rounded-full"
			style={style}
		>
			{children ? children : Icon && <Icon size={32} variant={variant} />}
		</Button>
	);
};

export default IconButton;
