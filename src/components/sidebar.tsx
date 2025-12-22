'use client'

import { style, iconStyle } from "@react-spectrum/s2/style" with { type: 'macro' }
import Libraries from '@react-spectrum/s2/illustrations/gradient/generic1/Libraries';
import Heading from "@/ui/heading";
import Navbar from "./navbar";

const Sidebar = () => {
  const sidebarStyle = style({
    gridArea: 'sidebar',
    paddingY: 20,
    paddingX: 8
  });

  const renderLogo = () => {
    return (
      <Libraries UNSAFE_style={{
        width: 64
      }}  />
    );
  }


  return (
    <div className={sidebarStyle}>

        {renderLogo()}
        <Navbar />
    </div>
  );
};

export default Sidebar;
