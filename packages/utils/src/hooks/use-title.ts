import { useLocation } from "react-router";

export const useTitle = () => {
	const { pathname } = useLocation();
	if (!pathname) return "Home";
	const segments = pathname.replace("/", "").split("/");

	return segments && segments.length > 0 ? segments[1] || segments[0] || "Home" : "Home";
};

export default useTitle;
