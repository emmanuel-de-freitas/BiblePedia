'use client'

import { style } from "@react-spectrum/s2/style" with { type: 'macro' }
import Libraries from '@react-spectrum/s2/illustrations/gradient/generic1/Libraries';
import Navbar from "./navbar";
import IconButton from "@/ui/icon-button";
import { useAtom, useAtomValue } from "jotai";
import { sidebarOpenAtom } from "@/atoms/layout";
import { motion, useInstantLayoutTransition, useMotionValue } from 'motion/react';
import { useEffect, useMemo } from "react";
import { myStore } from "../atoms";

const MotionIconButton = motion.create(IconButton);

const Sidebar = () => {
  const sidebarStyle = style({
    gridArea: 'sidebar',
    paddingY: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingX: 8
  });

  const renderLogo = () => {
    return (
      <Libraries UNSAFE_style={{
        width: 58
      }}  />
    );
  }

  const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom, { store: myStore });



  return (
    <motion.div className={sidebarStyle}>
      <div className={style({ paddingTop: 12 })}>
        {renderLogo()}
        <Navbar />
      </div>
      <div>
      <motion.div animate={{rotate: isOpen ? 180 : 0 }} style={{ display: 'inline-block' }}>
        <IconButton icon='SidebarRight' variant="Linear" onPress={() => setIsOpen(!isOpen)} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
