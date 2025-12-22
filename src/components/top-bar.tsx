import { style } from "@react-spectrum/s2/style" with { type: 'macro' }
import {Button, Avatar} from '@react-spectrum/s2';
import Search from "./search";
import Heading from '@/ui/heading';
import UserPopover from "./user-popover";

const Topbar = () => {
  const topbarStyle = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'calc(100% - 24px)',
    paddingX: 12
  });

  return (
    <div className={topbarStyle}>
      <Heading level={3}>Home</Heading>
      <Search />
      <UserPopover />
    </div>
  );
};

export default Topbar;
