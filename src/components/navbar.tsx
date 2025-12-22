'use client';

import { style } from "@react-spectrum/s2/style" with { type: 'macro' };
import NavButton from "./ui/nav-button";
import { Divider } from "@react-spectrum/s2";

const Navbar = () => {

  const navStyles = style({
    display: 'flex',
    flexDirection: "column",
    gap: 8,
    minWidth: 230
  });

  return (
    <div>
      <nav className={navStyles}>
        <NavButton icon="Home2" label="Home" />
        <NavButton icon="Book1" label="Library" />
        <NavButton icon="Stickynote" label="My Notes" />
        <NavButton icon="People" label="Community" />
      </nav>
      <Divider />
    </div>
  );
};

export default Navbar;
