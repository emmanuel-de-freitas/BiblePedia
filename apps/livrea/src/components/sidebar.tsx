"use client";

import { useAtom } from "jotai";
import { motion } from "motion/react";
import { sidebarOpenAtom } from "@/atoms/layout";
import { IconButton } from "@/components/buttons";
import { myStore } from "../atoms";
import Navbar from "./navbar";
import logo from "@/assets/biblepedia-light.png";
import Image from "next/image";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom, { store: myStore });


  const renderTitle = () => (
    <div className="flex flex-col justify-center">
      <span className="text-2xl font-semibold font-serif leading-6">Bible</span>
      <span className="text-lg leading-3 font-stretch-145% text-violet-700">pedia</span>
    </div>
  );

  const renderLogo = () => {
    return (
      <div className="flex items-center gap-2 py-3 px-1">
        <Image src={logo} alt="biblepedia" width={44} height={44} />
        {isOpen && renderTitle()}
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
