import { useAtom } from "jotai";
import { motion } from "motion/react";
import LogoSvg from "@/assets/biblepedia-light.svg?react";
import { sidebarOpenAtom } from "@/atoms/layout";
import { IconButton } from "@/components/buttons";
import { useTheme } from "@/hooks";
import { myStore } from "../atoms";
import Navbar from "./navbar";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom, { store: myStore });
	const { isDark } = useTheme();

	const renderTitle = () => (
		<div className="flex flex-col justify-center">
			<span className="text-xl font-semibold font-serif leading-5">Bible</span>
			<span className="text-sm leading-3 font-medium font-stretch-200% text-indigo-600 dark:text-indigo-300">
				pedia
			</span>
		</div>
	);

	const renderLogo = () => {
		return (
			<div className="flex items-center justify-start w-full gap-2 px-2">
				<LogoSvg className="select-none pointer-events-none w-7 h-7 stroke-black dark:stroke-white stroke-2 fill-black dark:fill-white" />
				{isOpen && renderTitle()}
			</div>
		);
	};

	return (
		<motion.div className="flex flex-col gap-4 justify-start items-center h-full mt-4">
			{renderLogo()}
			<Navbar />
			<motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
				<IconButton
					icon="SidebarRight"
					size={32}
					variant="Linear"
					onPress={() => setIsOpen(!isOpen)}
				/>
			</motion.div>
		</motion.div>
	);
};

export default Sidebar;
