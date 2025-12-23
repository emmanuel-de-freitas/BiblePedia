import { style } from "@react-spectrum/s2/style" with { type: 'macro' }
import Search from "./search";
import Heading from '@/ui/heading';
import UserPopover from "./user-popover";
import IconButton from "./ui/icon-button";
import usePathname from "@/hooks/usePathname";
import { useMatch } from "react-router";

const Topbar = () => {
  const topbarStyle = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'calc(100% - 24px)',
    paddingX: 12
  });

  const route = usePathname();
  const isActive = useMatch({ path: route });

  return (
    <div className={topbarStyle}>
      <Heading level={3}>{route}</Heading>
      <Search />
      <div className={style({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        gap: 4
      })}>
        <IconButton icon='Notification' onPress={() => {}}/>
        <IconButton icon='Setting2' onPress={() => {}}/>
        <UserPopover />
      </div>
    </div>
  );
};

export default Topbar;
