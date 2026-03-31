"use client";

import { Tooltip, TooltipTrigger } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useAtom } from "jotai";
import { sidebarOpenAtom } from "@/atoms/layout";
import { NavButton } from "@/components/buttons";
import { links } from "@/services/navigation";

const Navbar = () => {
   const [isOpen] = useAtom(sidebarOpenAtom);

   const navStyles = style({
      display: "flex",
      flexDirection: "column",
      rowGap: 4,
   });

   return (
      <nav className={navStyles} style={{ width: isOpen ? 220 : "auto" }}>
         {links?.map((link, index) => (
            <TooltipTrigger key={index} placement="start" delay={200} isDisabled={isOpen}>
               <NavButton icon={link.icon} label={isOpen ? link.label : undefined} route={link.route} />
               <Tooltip>{link.label}</Tooltip>
            </TooltipTrigger>
         ))}
      </nav>
   );
};

export default Navbar;
