import { useLocation } from "react-router";
import { Icon } from "@/components/icons";
import { Heading } from "@/components/typography";

import useTitle from "@/hooks/useTitle";
import { links } from "@/utils/navigation";
import Search from "./search";

const Topbar = () => {
	const route = useTitle();
	const { pathname } = useLocation();
	const icon = links.find((link) => link.route === pathname)?.icon;

	return (
		<div className="grid grid-cols-[1fr_2fr_1fr] items-center gap-x-2 px-3 w-[calc(100%-24px)]">
			<div className="flex items-center gap-2">
				{icon && <Icon icon={icon} variant="Bulk" />}
				<Heading level={3}>{route}</Heading>
			</div>

			<Search />

			<div className="flex items-center justify-end gap-1" />
		</div>
	);
};

export default Topbar;
