import { useTitle } from "@biblepedia/utils";
import { useEffect, useState } from "react";

const TitleBar = () => {
	const [, setIsMounted] = useState(false);
	const title = useTitle();

	useEffect(() => {
		setIsMounted(true);

		let cleanup: (() => void) | undefined;

		return () => {
			cleanup?.();
		};
	}, []);

	return (
		<div className="flex w-full h-full items-center select-none justify-center px-4 electrobun-webkit-app-region-drag">
			<span className="text-xs font-medium capitalize tracking-tight">
				BiblePedia&copy; | {title}
			</span>
		</div>
	);
};

export default TitleBar;
