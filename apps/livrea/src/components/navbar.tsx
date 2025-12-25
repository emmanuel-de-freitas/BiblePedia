'use client';

import { style } from "@react-spectrum/s2/style" with { type: 'macro' };
import { NavButton } from "@philagora/ui";
import { sidebarOpenAtom } from "@/atoms/layout";
import { useAtom } from "jotai";
import { Tooltip, TooltipTrigger } from "@react-spectrum/s2";
import { links } from "@/services/navigation";

const Navbar = () => {

  const [isOpen] = useAtom(sidebarOpenAtom);

  const navStyles = style({
    display: 'flex',
    flexDirection: "column",
    rowGap: 12
  });



  return (
      <nav className={navStyles} style={{ width: isOpen ? 256 : 'auto' }}>
        {
        links && links.map((link, index) => (
            <TooltipTrigger key={index} placement="start" delay={200} isDisabled={isOpen}>
              <NavButton icon={link.icon} label={isOpen ? link.label : undefined} route={link.route} />
              <Tooltip>{ link.label }</Tooltip>
            </TooltipTrigger>
          ))
        }
      </nav>
  );
};

export default Navbar;
