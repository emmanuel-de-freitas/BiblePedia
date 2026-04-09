import { Window } from "@biblepedia/ui";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { LayoutGroup, motion } from "motion/react";
import { Outlet } from "react-router";
import { Sidebar, Topbar } from "@/components";

const styles = {
	layout: style({
		display: "grid",
		gap: 16,
		gridAutoFlow: "dense",
		gridTemplateAreas: [
			"siderbar topbar topbar topbar",
			"sidebar content content inspector",
			"sidebar content content inspector",
		],
	}),
	sidebar: style({
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		paddingX: 4,
		paddingY: 8,
		gridArea: "sidebar",
	}),
	content: style({
		display: "flex",
		flexDirection: "column",
		gap: 4,
		paddingTop: 8,
		gridArea: "content",
	}),
	topbar: style({
		display: "flex",
		flexDirection: "column",
		gap: 4,
		paddingTop: 8,
		gridArea: "content",
	}),
	inspector: style({
		borderRadius: "xl",
		backgroundColor: "base",
		padding: 20,
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
