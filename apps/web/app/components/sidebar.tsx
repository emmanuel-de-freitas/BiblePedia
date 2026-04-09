import { useAtom } from "jotai";
import { motion } from "motion/react";
import logoDark from "@/assets/app-icon-dark.png";
import logo from "@/assets/app-icon-light.png";
import { sidebarOpenAtom } from "@/atoms/layout";
import { IconButton } from "@/components/buttons";
import { useTheme } from "@/hooks";
import { myStore } from "../atoms";
import Navbar from "./navbar";

const Image = ({
	src,
	alt,
	className,
	width,
	height,
	style,
}: {
	src: string | undefined;
	alt: string;
	className?: string;
	width?: number;
	height?: number;
	style?: React.CSSProperties;
}) => <img src={src} alt={alt} className={className} width={width} height={height} style={style} />;

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
				<Image
					className="select-none pointer-events-none"
					src={isDark ? logoDark : logo}
					alt="biblepedia"
					style={{ width: 36, height: 36 }}
				/>
				{isOpen && renderTitle()}
			</div>
		);
	};

	return (
		<motion.div className="flex flex-col gap-4 justify-start items-center h-full">
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
