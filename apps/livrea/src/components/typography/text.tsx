"use client";

import { useMemo } from "react";
import type { TextVariant } from "@/types";

interface TextProps {
	children: React.ReactNode;
	variant?: TextVariant;
	ref?: React.Ref<HTMLSpanElement>;
	textStyle?: React.CSSProperties;
	className?: string;
}

const Text = ({ children, variant, ref, textStyle, className }: TextProps) => {
	const styles = useMemo(
		() => ({
			caption: "text-sm font-sans font-normal select-none",
			default: "text-base font-sans font-normal select-none",
			description: "text-lg font-sans font-normal select-none",
			label: "text-base font-sans font-bold select-none",
			navigation: "text-lg font-sans font-medium select-none",
		}),
		[]
	);

	const elementStyle = variant ? styles[variant] : styles.default;
	const combinedClassName = className ? `${elementStyle} ${className}` : elementStyle;

	return (
		<span
			ref={ref}
			className={combinedClassName}
			style={{
				...textStyle,
				textOverflow: "clip",
				textWrap: "nowrap",
			}}
		>
			{children}
		</span>
	);
};

export default Text;
