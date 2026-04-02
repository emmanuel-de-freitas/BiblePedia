"use client";

import { useAtom } from "jotai";
import { motion } from "motion/react";
import { sidebarOpenAtom } from "@/atoms/layout";
import { IconButton } from "@/components/buttons";
import { myStore } from "../atoms";
import Navbar from "./navbar";
import Logo from "@/assets/bible-pedia.svg";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom, { store: myStore });

  const renderLogo = () => {
    return (
      <div className="flex items-center gap-2 mb-4">
        <Logo className="w-16 h-16 text-primary" />
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="text-xl font-bold"
          >
            Livrea
          </motion.span>
        )}
      </div>
    );
  };

  return (
    <motion.div className="flex flex-col justify-between px-2 py-5 [grid-area:sidebar]">
      <div className="pt-3 px-2">
        {renderLogo()}
        <Navbar />
      </div>
      <div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          style={{ display: "inline-block" }}
        >
          <IconButton
            icon="SidebarRight"
            variant="Linear"
            onPress={() => setIsOpen(!isOpen)}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
