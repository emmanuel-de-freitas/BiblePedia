"use client";

import { useAtom } from "jotai";
import { sidebarOpenAtom } from "@/atoms/layout";
import { NavButton } from "@/components/buttons";
import { links } from "@/utils/navigation";

const Navbar = () => {
	const [isOpen] = useAtom(sidebarOpenAtom);

	return (
		<nav className="flex flex-col gap-2" style={{ width: isOpen ? 220 : "auto" }}>
			{links?.map((link, index) => (
				<NavButton
					key={index}
					icon={link.icon}
					label={link.label}
					href={link.route}
					isExpanded={isOpen}
				/>
			))}
		</nav>
	);
};

export default Navbar;
