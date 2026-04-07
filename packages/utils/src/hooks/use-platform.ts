import { UAParser } from "ua-parser-js";

const usePlatform = () => {
	const parser = new UAParser();
	const os = parser.getOS();
	return os;
};

export default usePlatform;
