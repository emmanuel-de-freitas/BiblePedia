"use client";

import { usePathname } from "next/navigation";

export const useTitle = () => {
	const pathname = usePathname();
	if (!pathname) return "Home";
	const segments = pathname.replace("/", "").split("/");

	return segments && segments.length > 0 ? segments[1] || segments[0] || "Home" : "Home";
};

export default useTitle;
