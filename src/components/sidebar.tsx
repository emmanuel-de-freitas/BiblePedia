'use client'

import { style } from "@react-spectrum/s2/style" with { type: 'macro' }
import Heading from "@/ui/heading";
import Text from "@/ui/text";

const Sidebar = () => {
  const sidebarStyle = style({
    width: 'auto',
    margin: 32,
    borderRadius: 'pill'
  });


  return (
    <div className={sidebarStyle}>
      <Text>Livrea</Text>
      <Heading level={1}>Hello Next.js!</Heading>
    </div>
  );
};

export default Sidebar;
