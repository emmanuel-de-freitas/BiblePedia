import { Window } from "@biblepedia/ui";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { LayoutGroup, motion } from "motion/react";
import { Outlet } from "react-router";
import { Sidebar, Topbar } from "@/components";

const styles = {
	layout: style({
		display: "grid",
		gridTemplateAreas: [
			"sidebar topbar topbar",
			"sidebar content inspector",
			"sidebar content inspector",
		],
		gridTemplateColumns: "auto 1fr auto",
		gridTemplateRows: "auto 1fr auto",
		rowGap: 16,
		paddingX: 12,
		height: "full",
		columnGap: 12,
	}),
	sidebar: style({
		gridArea: "sidebar",
	}),
	content: style({
		backgroundColor: "base",
		borderRadius: "xl",
		boxShadow: "emphasized",
		padding: 20,
		flex: 1,
		height: "full",
		gridArea: "content",
	}),
	topbar: style({
		display: "flex",
		flexDirection: "column",
		gap: 4,
		gridArea: "topbar",
	}),
	inspector: style({
		gridArea: "inspector",
	}),
};

export default function Layout() {
	return (
		<Window>
			<LayoutGroup>
				<motion.div layout className={styles.layout}>
					<div className={styles.sidebar}>
						<Sidebar />
					</div>

					<div className={styles.topbar}>
						<Topbar />
					</div>

					<motion.main layout className={styles.content}>
						<Outlet />
					</motion.main>
					<motion.div className={styles.inspector}>
						<></>
					</motion.div>
				</motion.div>
			</LayoutGroup>
		</Window>
	);
}
