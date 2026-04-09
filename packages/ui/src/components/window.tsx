import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import type { ReactNode } from "react";
import TitleBar from "./title-bar";

const styles = {
	layout: style({
		display: "flex",
		backgroundColor: "layer-1",
		width: "screen",
		height: 'screen',
		flexDirection: "column"
	}),
	titlebar: style({
		width: "full",
		minHeight: 32
	}),
	content: style({
		width: "screen",
		height: '100%',
		flex: 1
	}),
	footer: style({
		width: "full",
		height: 56,
		display: 'flex',

		justifyContent: 'center',
		alignItems: 'center',
		padding: 12
	}),
};

export function Window({ children }: { children: ReactNode }) {
	return (
		<div className={styles.layout}>
			<div className={styles.titlebar}>
				<TitleBar />
			</div>
			<div className={styles.content}>{children}</div>
			<footer className={styles.footer}>
				<span>footer</span>
			</footer>
		</div>
	);
}
