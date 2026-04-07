import { LayoutGroup, motion } from "motion/react";
import { Outlet } from "react-router";
import { Sidebar, TitleBar, Topbar } from "@/components";

export default function Layout() {
	return (
		<div>
			<LayoutGroup>
				<TitleBar />
				<motion.div
					layout
					className="grid grid-cols-[auto_2fr] grid-rows-[100dvh] gap-y-3 bg-default-100 pe-3 ps-1 pt-4"
					style={{ gridTemplateAreas: "'sidebar content content'" }}
				>
					<Sidebar />
					<motion.main layout className="flex flex-col gap-4 pt-8 [grid-area:content]">
						<Topbar />
						<motion.div className="h-screen rounded-2xl bg-white dark:bg-background-tertiary p-7">
							<Outlet />
						</motion.div>
					</motion.main>
				</motion.div>
			</LayoutGroup>
		</div>
	);
}
