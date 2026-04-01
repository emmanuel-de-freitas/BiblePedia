"use client";

import { LayoutGroup, motion } from "motion/react";
import type { ReactNode } from "react";

import { Sidebar, TitleBar, Topbar } from "@/components";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <LayoutGroup>
      <TitleBar />
      <motion.div
        layout
        className="grid grid-cols-[auto_2fr] grid-rows-[100dvh] gap-y-3 bg-default-100 pe-3 ps-1"
        style={{ gridTemplateAreas: "'sidebar content content'" }}
      >
        <Sidebar />
        <motion.main
          layout
          className="flex flex-col gap-4 pt-16 [grid-area:content]"
        >
          <Topbar />
          <motion.div className="mb-3 h-full rounded-xl bg-background p-6 shadow-lg">
            {children}
          </motion.div>
        </motion.main>
      </motion.div>
    </LayoutGroup>
  );
}
