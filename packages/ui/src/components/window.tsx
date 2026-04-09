import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import type { ReactNode } from "react";
import TitleBar from "./title-bar";

const styles = {
	layout: style({
		display: "grid",
		backgroundColor: "layer-1",
		gridAutoFlow: "dense",
		gridTemplateAreas: ["titlebar", "content", "footer"],
	}),
	titlebar: style({
		gridArea: "titlebar",
	}),
	content: style({
		gridArea: "content",
	}),
	footer: style({
		padding: 20,
		gridArea: "footer",
	}),
};

export function Window({ children }: { children: ReactNode }) {
	return (
		<div className={styles.layout}>
			<div className={styles.titlebar}>
				<TitleBar />
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	);
}
