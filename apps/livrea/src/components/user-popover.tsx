import {IconButton} from "@philagora/ui";
import {
  Avatar,
  Divider,
  Menu,
  MenuItem,
  MenuSection,
  MenuTrigger,
  Popover,
  SubmenuTrigger,
  Switch,
  Text,
} from "@react-spectrum/s2";
import Buildings from "@react-spectrum/s2/icons/Buildings";
import Settings from "@react-spectrum/s2/icons/Settings";
import {style} from "@react-spectrum/s2/style" with {type: "macro"};

const UserPopover = () => {
   return (
      <MenuTrigger>
         <IconButton>
            <Avatar size={28} src="https://avatars.githubusercontent.com/u/29475051?v=4" />
         </IconButton>
         <Popover>
            <div className={style({ display: "flex", flexDirection: "column", gap: 12, paddingTop: 4 })}>
               <div className={style({ alignItems: "center", display: "flex", gap: 12, marginX: 12 })}>
                  <Avatar src="https://avatars.githubusercontent.com/u/29475051?v=4" size={56} />
                  <div>
                     <div className={style({ font: "title" })}>Devon Govett</div>
                     <div className={style({ font: "ui" })}>user@example.com</div>
                     <Switch styles={style({ marginTop: 4 })}>Dark theme</Switch>
                  </div>
               </div>
               <Divider styles={style({ marginX: 12 })} />
               <Menu aria-label="Account">
                  <MenuSection>
                     <SubmenuTrigger>
                        <MenuItem>
                           <Buildings />
                           <Text slot="label">Organization</Text>
                           <Text slot="value">Nike</Text>
                        </MenuItem>
                        <Menu selectionMode="single" selectedKeys={["nike"]}>
                           <MenuItem id="adobe">Adobe</MenuItem>
                           <MenuItem id="nike">Nike</MenuItem>
                           <MenuItem id="apple">Apple</MenuItem>
                        </Menu>
                     </SubmenuTrigger>
                     <MenuItem>
                        <Settings />
                        <Text slot="label">Settings</Text>
                     </MenuItem>
                  </MenuSection>
                  <MenuSection>
                     <MenuItem>Legal notices</MenuItem>
                     <MenuItem>Sign out</MenuItem>
                  </MenuSection>
               </Menu>
            </div>
         </Popover>
      </MenuTrigger>
   );
};

export default UserPopover;
