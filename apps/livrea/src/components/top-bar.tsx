import { style } from "@react-spectrum/s2/style" with { type: 'macro' }
import Search from "./search";
import Heading from '@/ui/heading';
import Icon from '@/ui/icon';
import IconButton from "./ui/icon-button";
import useTitle from "@/hooks/useTitle";
import { useLocation, useMatch } from "react-router";
import { links } from "@/services/navigation";
import UserPopover from "./user-popover";;

const Topbar = () => {
  const topbarStyle = style({
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
    alignItems: 'center',
    columnGap: 8,
    width: 'calc(100% - 24px)',
    paddingX: 12
  });

  const route = useTitle();
  const path = useLocation();
  const isActive = useMatch({ path: path.pathname });
  const icon = links.find(link => link.route === path.pathname)?.icon;


  return (
    <div className={topbarStyle}>
      <div className={style({
        display: 'flex',
        alignItems: 'center',
        gap: 8
      })}>
        {icon && <Icon icon={icon} variant="Bold" />}
        <Heading level={3}>{route}</Heading>
      </div>

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
