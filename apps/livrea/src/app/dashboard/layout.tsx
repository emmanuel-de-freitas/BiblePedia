"use client";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { LayoutGroup, motion } from "motion/react";
import type { ReactNode } from "react";

import { Sidebar, TitleBar, Topbar } from "@/components";

const dashboardStyle = style({
   backgroundColor: "layer-1",
   display: "grid",
   gridTemplateAreas: ["sidebar content content"],
   gridTemplateColumns: "auto 2fr",
   gridTemplateRows: "100dvh",
   paddingEnd: 12,
   paddingStart: 4,
   rowGap: 12,
});

const mainStyle = style({
   display: "flex",
   flexDirection: "column",
   gridArea: "content",
   paddingTop: 64,
   rowGap: 16,
});

const contentStyle = style({
   backgroundColor: "base",
   borderRadius: "xl",
   boxShadow: "emphasized",
   height: "full",
   marginBottom: 12,
   padding: 24,
});

interface DashboardLayoutProps {
   children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
   return (
      <LayoutGroup>
         <TitleBar />
         <motion.div layout className={dashboardStyle}>
            <Sidebar />
            <motion.main layout className={mainStyle}>
               <Topbar />
               <motion.div className={contentStyle}>{children}</motion.div>
            </motion.main>
         </motion.div>
      </LayoutGroup>
   );
}
