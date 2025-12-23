'use client';

import { style } from "@react-spectrum/s2/style" with { type: 'macro' };
import NavButton from "./ui/nav-button";
import type { LIIconName } from "@/services/icons";
import { sidebarOpenAtom } from "@/atoms/layout";
import { useAtom } from "jotai";
import { Tooltip, TooltipTrigger } from "@react-spectrum/s2";

const Navbar = () => {

  const navStyles = style({
    display: 'flex',
    flexDirection: "column",
    rowGap: 12,
    //paddingTop: 4
  });

  const links: { icon: LIIconName, label: string, route: string }[] = [
    { icon: "Home2", label: "Home", route: "dashboard/home" },
    { icon: "Book1", label: "Library", route: "dashboard/library" },
    { icon: "Stickynote", label: "My Notes", route: "dashboard/citations" },
    { icon: "People", label: "Community", route: "dashboard/community" }
  ]

  const [isOpen] = useAtom(sidebarOpenAtom);

  return (
      <nav className={navStyles}>
        {
        links && links.map((link, index) => (
            <TooltipTrigger placement="start" delay={200} isDisabled={isOpen}>
              <NavButton key={index} icon={link.icon} label={isOpen ? link.label : undefined} route={link.route} />
              <Tooltip>{ link.label }</Tooltip>
            </TooltipTrigger>
          ))
        }
      </nav>
  );
};

export default Navbar;
