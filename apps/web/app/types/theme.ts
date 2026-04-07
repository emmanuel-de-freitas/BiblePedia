// Theme-related types and interfaces

type TOption = "light" | "dark" | "system";
interface ITheme {
	mode: TOption;
	name: string;
}

export type { ITheme, TOption };
