"use client";

import { IconButton } from "@/components/buttons";
import { Heading } from "@/components/typography";
import { Icon } from "@/components/icons";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { usePathname } from "next/navigation";

import useTitle from "@/hooks/useTitle";
import { links } from "@/services/navigation";
import Search from "./search";
import UserPopover from "./user-popover";

const Topbar = () => {
   const topbarStyle = style({
      alignItems: "center",
      columnGap: 8,
      display: "grid",
      gridTemplateColumns: "1fr 2fr 1fr",
      paddingX: 12,
      width: "calc(100% - 24px)",
   });

   const route = useTitle();
   const pathname = usePathname();
   const icon = links.find((link) => link.route === pathname)?.icon;

   return (
      <div className={topbarStyle}>
         <div
            className={style({
               alignItems: "center",
               display: "flex",
               gap: 8,
            })}>
            {icon && <Icon icon={icon} variant="Bulk" />}
            <Heading level={3}>{route}</Heading>
         </div>

         <Search />
         <div
            className={style({
               alignItems: "center",
               display: "flex",
               gap: 4,
               justifyContent: "end",
            })}>
            <IconButton icon="Notification" onPress={() => {}} />
            <IconButton icon="Setting2" onPress={() => {}} />
            <UserPopover />
         </div>
      </div>
   );
};

export default Topbar;
