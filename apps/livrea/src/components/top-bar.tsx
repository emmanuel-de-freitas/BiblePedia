"use client";

import { usePathname } from "next/navigation";
import { IconButton } from "@/components/buttons";
import { Icon } from "@/components/icons";
import { Heading } from "@/components/typography";

import useTitle from "@/hooks/useTitle";
import { links } from "@/services/navigation";
import Search from "./search";
import UserPopover from "./user-popover";

const Topbar = () => {
	const route = useTitle();
	const pathname = usePathname();
	const icon = links.find((link) => link.route === pathname)?.icon;

	return (
		<div className="grid grid-cols-[1fr_2fr_1fr] items-center gap-x-2 px-3 w-[calc(100%-24px)]">
			<div className="flex items-center gap-2">
				{icon && <Icon icon={icon} variant="Bulk" />}
				<Heading level={3}>{route}</Heading>
			</div>

			<Search />

			<div className="flex items-center justify-end gap-1">
				<IconButton icon="Notification" onPress={() => {}} />
				<IconButton icon="Setting2" onPress={() => {}} />
				{/*<UserPopover />*/}
			</div>
		</div>
	);
};

export default Topbar;
