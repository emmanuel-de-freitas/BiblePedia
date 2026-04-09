import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { LayoutGroup, motion } from "motion/react";
import { Outlet } from "react-router";
import { Sidebar, TitleBar, Topbar } from "@/components";

const styles = {
	layout: style({
		display: "grid",
		gridTemplateColumns: "auto",
		gridAutoRows: "max-content",
		gap: 16,
		gridTemplateAreas: ["sidebar", "content", "content"],
	}),
	body: style({
		display: "flex",
		flexDirection: "column",
		gap: 4,
		paddingTop: 8,
		gridArea: "content",
	}),
	detail: style({
		borderRadius: "xl",
		backgroundColor: "base",
		padding: 20,
	}),
};

export default function Layout() {
	return (
		<div>
			<LayoutGroup>
				<TitleBar />
				<motion.div layout className={styles.layout}>
					<Sidebar />
					<motion.main layout className={styles.body}>
						<Topbar />
						<motion.div className={styles.detail}>
							<Outlet />
						</motion.div>
					</motion.main>
				</motion.div>
			</LayoutGroup>
		</div>
	);
}
