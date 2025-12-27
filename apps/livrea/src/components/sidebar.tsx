"use client";

import {IconButton} from "@philagora/ui";
import Libraries from "@react-spectrum/s2/illustrations/gradient/generic1/Libraries";
import {style} from "@react-spectrum/s2/style" with {type: "macro"};
import {useAtom} from "jotai";
import {motion} from "motion/react";
import {sidebarOpenAtom} from "@/atoms/layout";
import {myStore} from "../atoms";
import Navbar from "./navbar";

const Sidebar = () => {
   const sidebarStyle = style({
      display: "flex",
      flexDirection: "column",
      gridArea: "sidebar",
      justifyContent: "space-between",
      paddingX: 8,
      paddingY: 20,
   });

   const renderLogo = () => {
      return (
         <Libraries
            UNSAFE_style={{
               width: 58,
            }}
         />
      );
   };

   const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom, { store: myStore });

   return (
      <motion.div className={sidebarStyle}>
         <div className={style({ paddingTop: 12, paddingX: "text-to-control" })}>
            {renderLogo()}
            <Navbar />
         </div>
         <div>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} style={{ display: "inline-block" }}>
               <IconButton icon="SidebarRight" variant="Linear" onPress={() => setIsOpen(!isOpen)} />
            </motion.div>
         </div>
      </motion.div>
   );
};

export default Sidebar;
